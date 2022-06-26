
// parsing and pre processing the data into
function preprocessData(csvFile){
  // const csvFs = require('fs');

  // const csvFile = "pod-data.csv";//fs.readFile("pod-data.csv"); //"pod-data.csv";
  // const csv = require('csvtojson');
  const importedFile = csvFile.files[0];
  if (importedFile) {
    Papa.parse(importedFile,{
      header:true,
      complete: function (fileContent,file) {
        console.log(fileContent);
      }
    })

  }
  let csvJson = Papa.parse(csvFile);
  csv().fromFile(csvFile).then((data)=>{
    return data;
  });
  console.log(csvJson);

}
// parsing the preprocessed data onto the front end
function displayData() {
  dcoument.getElementById("search_results_container")
}

// parsing the preprocessed data onto the front end
function searchForData() {
  const dataRequest = new XMLHttpRequest();
  dataRequest.onload = function () {
    displayData()


  }
  dataRequest.open('GET',)
  dataRequest.send()


}
