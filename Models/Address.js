const mongoose = require('mongoose');

mongoose.set('debug', true);
const geocoder = require('../Middleware/geocoder');
const ServingZipcodes = require('../Models/ServingZipcodes-Master');

const KitchenAddressSchema = new mongoose.Schema({
    kitchenName: {
        type: String,
        maxlength: 25,
        required: [true, 'Please add a Kitchen Name'],
        trim: true,
        lowercase: true,
        index: { unique: [true, 'Kitchen Name already exit = mongo model error '], sparse: true },
    },

    address: {
        type: String,
        required: [true, 'Please add address'],
        trim: true,
        lowercase: true,
        maxlength: [100, 'address can not be more than 100 characters'],
    },
    city: {
        type: String,
        minlength: 3,
        maxlength: 25,
        required: [true, 'Please add City'],
        trim: true,
        lowercase: true,
    },
    street: {
        type: String,
        minlength: 3,
        maxlength: 25,
        required: [true, 'Please add Street'],
        trim: true,
        lowercase: true,
    },
    state: {
        type: String,
        minlength: 3,
        maxlength: 25,
        required: [true, 'Please add State'],
        trim: true,
        lowercase: true,
    },
    zipcode: {
        type: String,
        minlength: 3,
        maxlength: 6,
        required: [true, 'Please add State'],
        trim: true,
        lowercase: true,
    },
    radius: { type: Number, required: [true, 'Please add serving radius'], default: 5 },
    Geolocation: {
        // GeoJSON Point
        type: {
            type: String,
            enum: ['Point'],
            required: false,
        },
        coordinates: {
            type: [Number],
            required: false,
            index: '2dsphere',
        },
        formattedAddress: { type: String, minlength: 1, maxlength: 30, trim: true, lowercase: true },
        street: { type: String, minlength: 1, maxlength: 30, trim: true, lowercase: true },
        city: { type: String, minlength: 1, maxlength: 30, trim: true, lowercase: true },
        state: { type: String, minlength: 1, maxlength: 30, trim: true, lowercase: true },
        zipcode: { type: String, minlength: 1, maxlength: 30, trim: true, lowercase: true },
        country: { type: String, minlength: 1, maxlength: 30, trim: true, lowercase: true },
    },

    status: { type: Number, default: false },
    create_at: { type: Date, required: true, default: Date.now },
});

// Geocode & create fromated  location field
KitchenAddressSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address);
    const servingZipcode = await ServingZipcodes.findOne({ zipcode: loc[0].zipcode }).lean();
    if (!servingZipcode) {
        throw new Error('not_serving_this_zipcode');
    }
    // console.log('-----geocoder API ran', loc);
    this.Geolocation = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        contry: loc[0].countryCode,
    };

    // dont save address inDB
    // this.address = undefined;

    next();
});

module.exports = mongoose.model('AddressKitchen', KitchenAddressSchema);
