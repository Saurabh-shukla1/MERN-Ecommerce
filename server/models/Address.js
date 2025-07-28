import moongose from 'mongoose';


const AddressSchema = new moongose.Schema({
    userId: String,
    address : String,
    city: String,
    state: String,
    country: String,
    pincode: String,
    phone: String,
    notes: String,
}, {
    timestamps: true,
});

const Address = moongose.model('Address', AddressSchema);

export default Address;