
let img_url = "";
let api_key = "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";

let system_prompt = `Given an ID Card or passport image claude gives a json response such that the person has age above 18 or not, the person's passport has not expired or not, the person is from usa or not. The format:
{
"ageLimitCrossed": false,
"expired" : true,
"fromUSA" : false
}`;