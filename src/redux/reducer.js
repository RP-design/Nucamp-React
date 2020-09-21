import { CAMPSITES } from '../components/shared/campsites';
import { COMMENTS } from '../components/shared/comments';
import { PARTNERS } from '../components/shared/partners';
import { PROMOTIONS } from '../components/shared/promotions';


export const initialState = {
    campsites: CAMPSITES,
    comments: COMMENTS,
    partners: PARTNERS,
    promotions: PROMOTIONS
};

export const Reducer = (state = initialState, action) => {
    return state;
};