import { cva } from "class-variance-authority";

export const message_aligment = cva([],
    {
        variants: {
            type: {
                user: '',
                assistant: '',
            },
            align: {
                sequential: '',
                extreme: 'self-end'
            },
        },
        compoundVariants: [{
            type: "user",
            align: "sequential",
            className: ''
        }, {
            type: "user",
            align: "extreme",
            className: "self-end flex flex-row-reverse",
        }, {
            type: "assistant",
            align: "sequential",
            className: ''
        }, {
            type: "assistant",
            align: "extreme",
            className: "self-start"
        }],
        defaultVariants: {
            align: 'sequential'
        },
    }
);


