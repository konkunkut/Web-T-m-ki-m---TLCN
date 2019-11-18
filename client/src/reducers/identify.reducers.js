import {
    CONFIG_NAME,
    TEMP_INFO,
    TEMP_PICS
} from '../action/constants';

const identifyData = {
    // isLastName : null,
    // isFirstName : null
    fullName: {},
    tempData: {}
}

export default function(state = identifyData, action) {
    switch(action.type){
        case CONFIG_NAME:
            return{
                ...state,
                fullName: action.payload
            }
        case TEMP_INFO:
            return{
                ...state,
                tempData: action.payload
            }
        default:
            return state;
    }
}