

export const registerFormControls = [
    {
        name: 'username', // ✅ Fixed: Changed from 'Username' to 'username'
        label: 'Username',
        placeholder: 'Enter your username',
        componentType: 'input',
        type: 'text',
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        componentType: 'input',
        type: 'email',
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: '•••••••••',
        componentType: 'input',
        type: 'password',
    },
//     {
//         name: 'confirmPassword',
//         label: 'Confirm Password',
//         placeholder: 'Confirm your password',
//         componentType: 'input',
//         type: 'password',
//     },
 ]


export const loginFormControls = [
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        componentType: 'input',
        type: 'email',
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        componentType: 'input',
        type: 'password',
    },
    
]

export const addProductFormElements = [
    {
        name: 'title',
        label: 'Title',
        placeholder: 'Enter product title',
        componentType: 'input',
        type: 'text',
    },
    {
        name: 'description',
        label: 'Description',
        placeholder: 'Enter product description',
        componentType: 'textarea',
    },
    {
        name: 'category',
        label: 'Category',
        componentType: 'select',
        Options: [
            { id: 'men', label: 'Men' },
            { id: 'women', label: 'Women' },
            { id: 'children', label: 'Children' },
            { id: 'footwear', label: 'Footwear' },
            { id: 'accessories', label: 'Accessories' },
        ],
    },
    {
        name: 'brand',
        label: 'Brand',
        componentType: 'select',
        Options: [
            { id: 'nike', label: 'Nike' },
            { id: 'adidas', label: 'Adidas' },
            { id: 'puma', label: 'Puma' },
            { id: 'reebok', label: 'Reebok' },
            { id: 'under-armour', label: 'Under Armour' },
        ],
    },
    {
        name: 'price',
        label: 'Price',
        placeholder: 'Enter product price',
        componentType: 'input',
        type: 'number',
    },
    {
        label: 'Sale Price',
        name: 'salePrice',
        placeholder: 'Enter product sale price',
        componentType: 'input',
        type: 'number',
    },
    {
        label: 'Total Stock',
        name: 'totalStock',
        placeholder: 'Enter total stock',
        componentType: 'input',
        type: 'number',
    }
];

export const shoppingHeaderMenuItems = [
    {
        id: 'home',
        label: 'Home',
        path: '/shop/home',
    },
    {
        id: "products",
        label : "Products",
        path: '/shop/listing'
    },
    {
        id: 'men',
        label: 'Men',
        path: '/shop/listing',
    },
    {
        id: 'women',
        label: 'Women',
        path: '/shop/listing',
    },
    {
        id: 'children',
        label: 'Children',
        path: '/shop/listing',
    },
    {
        id: 'footwear',
        label: 'Footwear',
        path: '/shop/listing',
    },
    {
        id: 'accessories',
        label: 'Accessories',
        path: '/shop/listing',
    },
    {
        id: "search",
        label: "Search",
        path: '/shop/search',
    }
];
export const categoryOptionsMap = {
    men: 'Men',
    women: 'Women',
    children: 'Children',
    footwear: 'Footwear',
    accessories: 'Accessories',
};

export const brandOptionsMap = {
    nike: 'Nike',
    adidas: 'Adidas',
    puma: 'Puma',
    reebok: 'Reebok',
    'under-armour': 'Under Armour',
};
export const filterOptions = {
        category : [
            {id : 'men', label: 'Men'},
            {id : 'women', label: 'Women'},
            {id : 'children', label: 'Children'},
            {id : 'footwear', label: 'Footwear'},
            {id : 'accessories', label: 'Accessories'},
        ],
        brand : [
            {id : 'nike', label: 'Nike'},
            {id : 'adidas', label: 'Adidas'},
            {id : 'puma', label: 'Puma'},
            {id : 'reebok', label: 'Reebok'},
            {id : 'under-armour', label: 'Under Armour'},
        ],
    
};

export const productSortOptions = [
    { id: 'price-asc', label: 'Price: Low to High' },
    { id: 'price-desc', label: 'Price: High to Low' },
    { id: 'newest', label: 'Newest Arrivals' },
    { id: 'popularity', label: 'Most Popular' },
    { id: 'title-atoz', label: 'Title: A to Z' },
    { id: 'title-ztoa', label: 'Title: Z to A' },
];

export const addressFormControls = [
    {
        label: 'Address',
        name: 'address',
        componentType: 'input',
        type: 'text',
        placeholder: 'Enter your address',
    },
    {
        label: 'City',
        name: 'city',
        componentType: 'input',
        type: 'text',
        placeholder: 'Enter your city',
    },
    {
        label: 'State',
        name: 'state',
        componentType: 'input',
        type: 'text',
        placeholder: 'Enter your state',
    },
    {
        label: 'Pin Code',
        name: 'pincode',
        componentType: 'input',
        type: 'text',
        placeholder: 'Enter your pin code',
    },
    {
        label: 'Country',
        name: 'country',
        componentType: 'input',
        type: 'text',
        placeholder: 'Enter your country',
    },
    {
        label: 'Phone',
        name: 'phone',
        componentType: 'input',
        type: 'text',
        placeholder: 'Enter your phone number',
    },
    {
        label: 'Notes',
        name: 'notes',
        componentType: 'textarea',
        placeholder: 'Enter any additional notes',
    }
]