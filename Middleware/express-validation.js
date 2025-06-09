const { check } = require('express-validator');

module.exports = {
    // Validation middleware check method for validation
    expressValidation: [
        check('firstName')
            .if(check('firstName').exists())
            .not()
            .isEmpty()
            .withMessage('First Name Cant be Empty!')
            .trim()
            .escape()
            .matches(/^[a-z ]+$/i)
            .withMessage('First name cannot contain number or symbols !')
            .isLength({ min: 3, max: 15 })
            .withMessage('Name must be of 3 characters long.'),

        check('lastName')
            .if(check('lastName').exists())
            .not()
            .isEmpty()
            .withMessage('Last Name Cant be Empty!')
            .trim()
            .escape()
            .matches(/^[a-z ]+$/i)
            .withMessage('Last name cannot contain number or symbols !')
            .isLength({ min: 3, max: 15 })
            .withMessage('Name must be of 3 characters long.'),

        check('email', 'Email Cannot be empty!')
            .if(check('email').exists())
            .not()
            .isEmpty()
            .isEmail()
            .withMessage('Email is not valid!')
            .trim()
            .escape(),

        // Fix this password regex ,we need proper check to make sure no skrips or xss attacts happening
        check('password')
            .if(check('password').exists())
            .not()
            .isEmpty()
            .withMessage('Password Cant be Empty!')
            .isLength({ min: 3, max: 25 })
            .withMessage('Password length in between 3 to 25 chars!')
            .trim()
            .escape()
            .matches(/^[A-Za-z0-9@!#?%&*$]*$/)
            .withMessage('Password cannot contain Scripts,tag,Space,etc'),

        check('retype_password')
            .if(check('retype_password').exists())
            .not()
            .isEmpty()
            .withMessage('Retype_password Cant be Empty!')
            .isLength({ min: 3, max: 25 })
            .withMessage('Retype_password length in between 3 to 25 chars!')
            .trim()
            .escape()
            .matches(/^[A-Za-z0-9@!#?%&*$]*$/)
            .withMessage('Retype_password cannot contain Scripts,tag,Space,etc'),

        check('phone_no')
            .if(check('phone_no').exists())
            .not()
            .isEmpty()
            .withMessage('Phone no Cant be Empty!')
            .isMobilePhone()
            .withMessage('Enter correct phone no')
            .isLength({ min: 10, max: 10 })
            .withMessage('Phone number cant be less then 10 chars!'),

        check('account_type')
            .if(check('account_type').exists())
            .not()
            .isEmpty()
            .withMessage('account_type Cant be Empty!')
            .trim()
            .escape()
            .matches(/^[a-z ]+$/i)
            .withMessage('account_type cannot contain number or symbols !'),

        check('apt_no')
            .if(check('apt_no').exists())
            .not()
            .isEmpty()
            .withMessage('apt_no Cant be Empty!')
            .trim()
            .escape()
            .matches(/^[a-z0-9 ]+$/i)
            .withMessage('apt_no cannot contain number or symbols !')
            .isLength({ min: 1, max: 10 })
            .withMessage('Name must be of 1 characters long.'),

        check('address_type')
            .if(check('address_type').exists())
            .not()
            .isEmpty()
            .withMessage('address_type Cant be Empty!')
            .trim()
            .escape()
            .matches(/^[a-z ]+$/i)
            .withMessage('address_type cannot contain number or symbols !')
            .isLength({ min: 1, max: 15 })
            .withMessage('Name must be of 1 characters long.'),

        check('meal_plan_id')
            .if(check('meal_plan_id').exists())
            .not()
            .isEmpty()
            .withMessage('meal_plan_id no Cant be Empty!')
            .matches(/^[0-9]+$/i)
            .withMessage('meal_plan_id cannot have symbols or Alphabets!')
            .trim()
            .escape()
            .isLength({ min: 1, max: 50 })
            .withMessage('meal_plan_id name must be of 3 characters long.'),

        check('stripe_card_id')
            .if(check('stripe_card_id').exists())
            .not()
            .isEmpty()
            .withMessage('stripe_card_id no Cant be Empty!')
            .matches(/^[a-z0-9_]+$/i)
            .withMessage('stripe_card_id cannot have symbols!')
            .trim()
            .escape()
            .isLength({ min: 1, max: 50 })
            .withMessage('stripe_card_id name must be of 3 characters long.'),

        check('zipcode')
            .if(check('zipcode').exists())
            .not()
            .isEmpty()
            .withMessage('Zipcode cant be Empty!')
            .isLength({ min: 5, max: 6 })
            .withMessage('Zipcode length in between 5 to 6 chars!')
            .isNumeric()
            .withMessage('Zipcode cannot contain Alphabet or symbols !')
            .trim()
            .escape(),

        check('address')
            .if(check('address').exists())
            .not()
            .isEmpty()
            .withMessage('address no Cant be Empty!')
            .matches(/^[a-z0-9, ]+$/i)
            .withMessage('address cannot have symbols!')
            .trim()
            .escape()
            .isLength({ min: 3, max: 50 })
            .withMessage('Address name must be of 3 characters long.'),

        check('street')
            .if(check('street').exists())
            .not()
            .isEmpty()
            .withMessage('Street Cant be Empty!')
            .trim()
            .escape()
            .matches(/^[a-z0-9 ]+$/i)
            .withMessage('Street cannot contain symbols !')
            .isLength({ min: 3, max: 15 })
            .withMessage('Street name must be of 3 characters long.'),

        check('city')
            .if(check('city').exists())
            .not()
            .isEmpty()
            .withMessage('City Cant be Empty!')
            .trim()
            .escape()
            .matches(/^[a-z ]+$/i)
            .withMessage('City cannot contain number or symbols !')
            .isLength({ min: 3, max: 15 })
            .withMessage('City name must be of 3 characters long.'),

        check('kitchen_start_date')
            .if(check('kitchen_start_date').exists())
            .not()
            .isEmpty()
            .withMessage("kitchen_start_date can't be Empty!"),

        check('pay_as_you_go_delivery_price')
            .if(check('pay_as_you_go_delivery_price').exists())
            .not()
            .isEmpty()
            .withMessage("pay_as_you_go_delivery_price can't be Empty!"),

        check('operation_start_time')
            .if(check('operation_start_time').exists())
            .not()
            .isEmpty()
            .withMessage("operation_start_time can't be Empty!"),

        check('operation_end_time')
            .if(check('operation_end_time').exists())
            .not()
            .isEmpty()
            .withMessage("operation_end_time can't be Empty!"),

        check('state')
            .if(check('state').exists())
            .not()
            .isEmpty()
            .withMessage('State Cant be Empty!')
            .trim()
            .escape()
            .matches(/^[a-z ]+$/i)
            .withMessage('State cannot contain number or symbols !')
            .isLength({ min: 2, max: 15 })
            .withMessage('State must be of 2 characters long.'),

        // Radius can be empty but cannot have more then 3 number or symbols if enterning
        check('radius')
            .if(check('radius').exists())
            .trim()
            .escape()
            .matches(/^[0-9 ]+$/i)
            .withMessage('Radius cannot contain Alphabet or symbols !')
            .isLength({ min: 1, max: 3 })
            .withMessage('Radius must be of 1 characters long.'),

        check('admin_type')
            .if(check('admin_type').exists())
            .not()
            .isEmpty()
            .withMessage('Admin type Cant be Empty!')
            .trim()
            .escape()
            .matches(/^[a-z ]+$/i)
            .withMessage('Admin type cannot contain number or symbols !')
            .isLength({ min: 2, max: 15 })
            .withMessage('Admin type must be of 2 characters long.'),
    ],

    validationsMealpackage: [
        check('meal_plan')
            .not()
            .isEmpty()
            .withMessage('meal_plan Cant be Empty!')
            .trim()
            .escape()
            .matches(/^[a-z ]+$/i)
            .withMessage('meal_plan cannot contain number or symbols !')
            .isLength({ min: 4, max: 15 })
            .withMessage('Name must be of 3 characters long.'),

        check('plan_plates')
            .not()
            .isEmpty()
            .withMessage('plan_plates Cant be Empty!')
            .trim()
            .escape()
            .isNumeric()
            .withMessage('Only numbers allowed and no space')
            .isLength({ min: 1, max: 2 })
            .withMessage('plan_plates cant be less then 1 chars!'),

        check('price_perplate')
            .not()
            .isEmpty()
            .withMessage('price_perplate Cant be Empty!')
            .trim()
            .escape()
            .isNumeric()
            .withMessage('Only numbers allowed and no space')
            .isLength({ min: 1, max: 5 })
            .withMessage('price_perplate cant be less then 5 chars!'),
    ],

    requestValidation: [
        check('email', 'Email Cannot be empty!')
            .if(check('email').exists())
            .not()
            .isEmpty()
            .isEmail()
            .withMessage('Email is not valid!')
            .trim()
            .escape(),

        check('kitchenName')
            .if(check('kitchenName').exists())
            .not()
            .isEmpty()
            .withMessage('kitchenName no Cant be Empty!')
            .matches(/^[a-z0-9 ]+$/i)
            .withMessage('kitchenName cannot have symbols!')
            .trim()
            .escape()
            .isLength({ min: 3, max: 20 })
            .withMessage('kitchenName must be of 3 characters long.'),

        // check('kitchens.*')
        //   .if(check('kitchens.*').exists())
        //   .not()
        //   .isEmpty()
        //   .withMessage('kitchens cannot be empty!')
        //   .matches(/^[a-z0-9 ]+$/i)
        //   .withMessage('kitchens cannot have symbols!')
        //   .trim()
        //   .escape()
        //   .isLength({ min: 3, max: 20 })
        //   .withMessage('kitchens must be of 3 characters long.'),

        check('zipcode')
            .if(check('zipcode').exists())
            .not()
            .isEmpty()
            .withMessage('Zipcode cant be Empty!')
            .isLength({ min: 5, max: 6 })
            .withMessage('Zipcode length in between 5 to 6 chars!')
            .isNumeric()
            .withMessage('Zipcode cannot contain Alphabet or symbols !')
            .trim()
            .escape(),
    ],
    free_plates_discount_codes: [
        { code: '123', type: 'plates', value: 2 },
        { code: '345', type: 'plates', value: 5 },
        { code: '555', type: 'percentage', value: 10 },
    ],
    pay_as_you_go_discount_codes: [
        { code: '123', type: 'free', value: 0 },
        { code: '245', type: 'percentage', value: 10 },
        { code: '345', type: 'free_delivery', value: 0 },
        { code: '555', type: 'percentage_delivery', value: 50 },
        { code: '567', type: 'amount_off', value: 10 },
    ],
    blocked_zipcodes: [281005, 60043],
    percent_price_as_per_device: { android: 15, ios: 20, desktop: 0 },
};
