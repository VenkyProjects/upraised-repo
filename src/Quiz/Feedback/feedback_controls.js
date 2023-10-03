const feedback_controls=[
    {
        name    :"name",
        label   :"Quiz Difficulty",
        type    :'input',
        span    : 4,
        rules   : { required: 'Required' },
    },
    {
        name:"type_of_crop",
        label:"Select type of crop",
        type:'select',
        option:[
            {
                label:'Bajra',
                value:'bajra',
            },
            {
                label:'Maize',
                value:'maize',
            },
        ],
        span        : 4,
        placeholder : 'Select type of crop',
        rules       : { required: 'Required' },
    },
    {
        name:"acres",
        label:"Enter No of Acres",
        type:'number',
        span        : 4,
        placeholder : 'Enter No of Acres',
        rules       : { required: 'Required' },

    },
    {
        name:"quintals",
        label:"Enter No of Quintals",
        type:'number',
        span        : 4,
        placeholder : 'Enter No of Qunitals',
        rules       : { required: 'Required' },

    },
    {
        name:"urea",
        label:"Enter No of Urea packets",
        type:'number',
        span        : 4,
        placeholder : 'Enter No of packets',
        rules       : { required: 'Required' },

    },
    {
        name:"pesticides",
        label:"Enter No of Pesticides",
        type:'nummber',
        span        : 4,
        placeholder : 'Enter No of Pesticides',
        rules       : { required: 'Required' },
    },
    {
        name:"amount",
        label:"Amount Per Quintal",
        type:'number',
        span        : 4,
        placeholder : 'Amount Per Quintal',
        rules       : { required: 'Required' },

    },
]

export default feedback_controls;