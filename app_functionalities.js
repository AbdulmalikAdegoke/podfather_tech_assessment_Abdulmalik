let fileData=[];
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
        console.log(Object.keys(fileContent.data[0]));
        document.getElementById("search_results_container").style.visibility="visible";
      }
    })
  } else {
    alert("File not imported.");
  }
}
// parsing the preprocessed data onto the front end
function displayData() {
  document.getElementById("search_results_container").style.visibility="visible";
  // document.getElementById("table_body").innerHTML;
  // <tr>
  //   <td></td>
  // </tr>


}

// function responsible for the filtering of the retrieved table results
function filterSearch() {
  let searchFilter = document.getElementById("column_selection").value;

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
