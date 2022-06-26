
// parsing and pre processing the data into
function preprocessData(csvFile){
  // the imported csv file initialisation
  const importedFile = csvFile.files[0];
  // confirmation of file import
  if (importedFile) {
    Papa.parse(importedFile,{
      header:true,
      complete: function (fileContent,file) {
        console.log(fileContent);
      }
    })
  } else {
    alert("File not imported.");
  }
}
// parsing the preprocessed data onto the front end
function displayData() {
  dcoument.getElementById("search_results_container").visibility="visible";
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
