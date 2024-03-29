import Kyc from "../models/Kyc.js";
import AuthModel from "../models/Auth.js";
import { sendEmail } from "../utils/sendEmail.js";

const parser = (dobString) => {
  const parts = dobString.split("/");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  const dob = new Date(Date.UTC(year, month, day, 0, 0, 0));
  return dob;
};

export const createKyc = async (req, res) => {
  try {
    const { cnicImage } = req.body;
    const userId = req.userId;
    // const kyc = await Kyc.create({ cnicImage, userId });
    const options = {
      method: "POST",
      url: "https://passport-ocr1.p.rapidapi.com/api/v1/ocr-passport",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "ae15d3f710msh4c8061c991ea32dp130e3cjsnf92ca2e5eaf0",
        "X-RapidAPI-Host": "passport-ocr1.p.rapidapi.com",
      },
      data: {
        image: cnicImage,
        return_portrait_image: true,
      },
    };
    const response = await fetch(options.url, {
      method: options.method,
      headers: options.headers,
      body: JSON.stringify(options.data),
    });
    const data = await response.json();
    console.log(data);
    let user = await AuthModel.findById(userId);

    if (!data.result) {
      return res
        .status(400)
        .send("Couldn't perform KYC, please try again, or apply manually");
    }

    if (!data.result.date_of_birth) {
      return res
        .status(400)
        .send("Date of birth not found, please upload a clear picture");
    }

    if (!data.result.date_of_expiry) {
      return res
        .status(400)
        .send("Date of expiry not found, please upload a clear picture");
    }

    if (data.result.date_of_birth) {
      const dob = parser(data.result.date_of_birth);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      if (
        today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
      ) {
        age--;
      }
      if (age < 18) {
        return res
          .status(400)
          .send("Your age is below 18 and you are not eligible for trading");
      }
    }

    // checking if the date of expiry of the passport is valid
    if (data.result.date_of_expiry) {
      const expiry = parser(data.result.date_of_expiry);
      const today = new Date();
      if (expiry < today) {
        return res.status(400).send("Your passport has expired");
      }
    }

    // checking if the country code of the passport is PAK
    if (data.result.country_code === "USA") {
      return res.status(400).send("USA passport is not valid");
    }

    user.hasKYC = true;
    await user.save();
    await Kyc.create({
      image: cnicImage,
      userId,
      kycStatus: "approved",
      identityType: "passport",
    });
    res.status(201).json({ data });
    (async () => {
      try {
          const user = await AuthModel.findById(userId);
          const to = user.email;
          const subject = "KYC Approved";
          const text = `Congratulations, ${user.name}! Your KYC has been approved. You can now using the CRM. <br/>`;
          await sendEmail(to, subject, text);
      } catch (error) {
          console.error("Failed to send email:", error);
      }
  })();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const createManualKyc = async (req, res) => {
  try {
    const { image, identityType } = req.body;
    const userId = req.userId;
    const kyc = await Kyc.findOne({
      userId,
      kycStatus: "pending",
    });
    if (kyc) {
      return res
        .status(400)
        .send("You have already applied for KYC, please wait for the approval");
    }
    const kycData = await Kyc.create({ image, identityType, userId });
    res.status(201).json({ kycData });
    (async () => {
      try {
          const user = await AuthModel.findById(userId);
          const to = user.email;
          const subject = "Your KYC Request has been submitted";
          const text = `Your KYC request has been submitted. Please wait for the approval. <br/>`;
          await sendEmail(to, subject, text);
      } catch (error) {
          console.error("Failed to send email:", error);
      }
  })();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getKyc = async (req, res) => {
  try {
    const userId = req.userId;
    const kyc = await Kyc.findOne({
      userId,
    }).sort("-createdAt");
    res.status(200).json(kyc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllKycs = async (req, res) => {
  try {
    const kycs = await Kyc.find().populate("userId").sort("-createdAt");
    res.status(200).json(kycs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveKyc = async (req, res) => {
  try {
    const {id} = req.params;
    const kyc = await Kyc.findById(id);
    kyc.kycStatus = "approved";
    await kyc.save();
    const user = await AuthModel.findById(kyc.userId);
    user.hasKYC = true;
    await user.save();
    res.status(200).json(kyc);
    (async () => {
      try {
          const to = user.email;
          const subject = "KYC Approved";
          const text = `Your KYC has been approved. You can now use the CRM. <br/>`;
          await sendEmail(to, subject, text);
      } catch (error) {
          console.error("Failed to send email:", error);
      }
  })();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const rejectKyc = async (req, res) => {
  try {
    const {id} = req.params;
    const kyc = await Kyc.findById(id);
    kyc.kycStatus = "rejected";
    await kyc.save();
    res.status(200).json(kyc);
    (async () => {
      try {
          const user = await AuthModel.findById(kyc.userId);
          user.hasKYC = false;
          await user.save();
          const to = user.email;
          const subject = "KYC Rejected";
          const text = `Your KYC has been rejected. Please try again. <br/>`;
          await sendEmail(to, subject, text);
      } catch (error) {
          console.error("Failed to send email:", error);
      }
  })();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};