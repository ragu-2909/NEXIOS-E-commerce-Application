import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId= mongoose.ObjectId;


const Vendor = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String},
})

const VendorInfo = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    pincode: {type: String, required: true},
    telnum: { type: Number, required: true },
    licencenum: { type: String, required: true },
    vendorId: { type: Schema.Types.ObjectId },
    image: { type: [String], default: ["https://res.cloudinary.com/dkngwqe98/image/upload/v1728192792/default-user-pic_w0patr.jpg"] }
});

const VendorSales = new Schema({
    vendorId: {type: ObjectId, required: true},
    sales: {type: [Object]},
    totalRevenue: {type: Number},
    totalProfits: {type: Number}
})

const VendorModel = mongoose.model('vendor', Vendor);
const VendorInfoModel = mongoose.model('vendorInfo', VendorInfo);
const VendorSalesModel = mongoose.model('vendor-sales', VendorSales);

export {VendorModel, VendorInfoModel, VendorSalesModel }