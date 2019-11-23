import {
    CONFIG_NAME,
    TEMP_INFO,
    TEMP_PICS,
    VALID_AVATAR,
    STORE_ID_PLACE,
} from '../action/constants';

const identifyData = {
    // isLastName : null,
    // isFirstName : null
    fullName: {},
    tempData: {},
    tempPics:[],
    valid : {},
    storeIdPlace: null,
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
        case TEMP_PICS:
            return{
                ...state,
                tempPics: action.payload
            }
        case VALID_AVATAR:
            return{
                ...state,
                valid: action.payload
            }
        case STORE_ID_PLACE:
            return{
                ...state,
                storeIdPlace : action.payload
            }
        default:
            return state;
    }
}