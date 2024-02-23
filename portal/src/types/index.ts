type User = {
    _id: number;
    name: string;
    email: string;
    approved: boolean;
    createdAt: string;
    updatedAt: string;
};

type Deposit = {
    gateway: string;
    transaction: string;
    id: string;
    email: string;
    phone: string;
    country: string;
    joinedAt: string;
    timestamp: string;
    balance: string;
    type: number;
    status: string;
    name: string;
    amount: string;
    currency: string;
    conversion: string;

}
type Withdrawal = {
    gateway: string;
    transaction: string;
    id: string;
    email: string;
    phone: string;
    country: string;
    joinedAt: string;
    timestamp: string;
    balance: string;
    type: number;
    status: string;
    name: string;
    amount: string;
    currency: string;
    conversion: string;

}

type UserDetail = {
    name: string;
    id: string;
    email: string;
    phone: string;
    country: string;
    joinedAt: string;
    timestamp: string;
    balance: string;
    status: string;
    emailVerified: boolean;
    mobileVerified: boolean;
    kycVerified: boolean;
    kycPending: boolean;
    paid: boolean;

}

type Ticket = {
    name: string;
    id: string;
    joinedAt: string;
    timestamp: string;
    balance: string;
    status: string;
    subject: string;
    priority: string;

}

type ACData = {
    id: string,
    account: string,
    mainPassword: string,
    investorPassword: string,
    type: string,
    group: string,
    leverage: number,
    server: string,
    balance: number,
    equity: number,
    status: boolean,
}
export type { User, Deposit, Withdrawal, UserDetail, Ticket, ACData };