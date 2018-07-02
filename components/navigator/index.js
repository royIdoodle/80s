Component({
    externalClasses: ['i-class'],

    relations: {
        '../tab-bar/index': {
            type: 'parent'
        }
    },

    properties: {
        current: {
            type: String,
            default: ''
        }
    },

    data: {
        current: false,
        currentColor: ''
    },

    methods: {
        changeCurrent (current) {
            this.setData({ current });
        },
        changeCurrentColor (currentColor) {
            this.setData({ currentColor });
        },
        handleClickItem () {
            const parent = this.getRelationNodes('../tab-bar/index')[0];
            parent.emitEvent(this.data.key);
        }
    }
});
