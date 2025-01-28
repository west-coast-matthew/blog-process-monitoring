import _ from "lodash";

export const assertAttributePresent = (name:string, val:string)=>{
    if(_.isEmpty(val)){
        throw new Error(`No value present for attribute '${name}'`);
    }
}