import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export const CompilerFxn=(language_id,input,user_input,editorRef)=>{
    // setShow(false);
    console.log(language_id);
    localStorage.setItem("input",input);
    localStorage.setItem("language_Id",language_id);

    let outputText = document.getElementById("output");
    outputText.innerHTML = "";
    outputText.innerHTML += "Your Code is compiling so please wait ...\n";
 
    var options = {
       method: 'POST',
       url: 'https://judge0-ce.p.rapidapi.com/submissions',
       headers: {
         'content-type': 'application/json',
        
       },
       data: JSON.stringify({
           language_id: language_id,
           source_code: editorRef.current.getValue(),
           stdin: user_input,
       })
     };

    axios.request(options).then(function (response) {
        console.log(response.data);
   
        var options1 = {
          method: 'GET',
          url: `https://judge0-ce.p.rapidapi.com/submissions/${response.data.token}?base64_encoded=true`,
          headers: {
          }
        };
        
        axios.request(options1).then(function (responsedata) {
            console.log(responsedata.data);
            let compileText = document.getElementById("compileresult");

            if(responsedata.data.stdout){
               const output = atob(responsedata.data.stdout);
               console.log("OUTPUT " ,output);
               outputText.innerHTML = "";
               outputText.innerHTML += `${output}`;
               compileText.innerHTML=`Execution Time : ${responsedata.data.time} Secs\nMemory used : ${responsedata.data.memory} bytes`;
             } else if (responsedata.data.stderr) {
               const error = atob(responsedata.data.stderr);
               outputText.innerHTML = "";
               outputText.innerHTML += `\n Error :${error}`;
             } else {
               const compilation_error = atob(responsedata.data.compile_output);
               console.log(compilation_error);
               outputText.innerHTML = "";
               outputText.innerHTML += `\n Error :${compilation_error}`;
             }
   
   
        }).catch(function (error) {
            console.error(error);
        });
   
   
    }).catch(function (error) {
        console.error(error);
    });
   
// alert(editorRef.current.getValue());
}
