import moment from 'moment';

export function dateToMomentConverter(date){
    const mom = new moment(new Date(date))
    return mom;
}

export function momentToDateConverter(moment){
    if(moment == null || moment == undefined) return null;
    const date = moment.toDate();
    return `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
}
