import axios from 'axios'
import { getmd5} from './getmd5'
import qs from 'qs'
// const resulturl = "http://192.168.1.202";
// const weburl="http://192.168.1.216:8081/#/user"
const resulturl = "http://127.0.0.1";
const weburl="http://127.0.0.1/#/user"

axios.defaults.withCredentials = true;

let getajax = {

    
    ajaxFun(type, data, cmd, urlhouzu, callback) {
        let datas = "";
        let postdata = ""

                //postdata = JSON.stringify(datas)
            axios.post(resulturl + urlhouzu, qs.stringify(data), {
             
            }).then(function(response) {
               
                     callback(response.data)
            
            }).catch(function(error) {
                console.log(error);
            });
        
    },
    resurl(){
       
        return weburl;
    },
     serviurl(){
       
        return resulturl;
    }


};

export {
    getajax
}