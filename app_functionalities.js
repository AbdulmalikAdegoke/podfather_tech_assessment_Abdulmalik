let fileData=[];
let columns =["Customer","Site","Due By","Completed At","Job Type","Late","Flagged","Number of Items"]
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
        fileData=fileContent;
        // changing the binary values of the late and flagged rows to readable foromats for any user
        fileData.data.map((row)=>{
          row["Late"]==0?row["Late"]="On Time":row["Late"]="Late";
          row["Flagged"]==0?row["Flagged"]="Not Flagged":row["Flagged"]="Flagged";
        }
        )
        displayData(fileData);
        console.log(Object.keys(fileContent.data[0]));
        document.getElementById("search_results_container").style.visibility="visible";
      }
    })
  } else {
    alert("File not imported.");
  }
}
// displaying the preprocessed data onto the front end
function displayData(dataToDisplay,filterOption="None") {
  document.getElementById("search_results_container").style.visibility="visible";
  let tableToDisplay ="<tr>";
  // iterating through the csv data to create the rows of the data table
  dataToDisplay.data.map((row)=>{
    columns.forEach((columnName, i) => {
      tableToDisplay += "<td>" + row[columnName] + "</td>";
    });
    tableToDisplay +="</tr>";
  }
  )
  // <tr>
  //   <td></td>
  // </tr>
  // displaying the table
  document.getElementById("table_body").innerHTML=tableToDisplay;
}

// function responsible for the filtering of the retrieved table results
function filterSearch() {
  let searchFilter = document.getElementById("column_selection").value;
  console.log(fileData);
}

let searchFilter = document.getElementById("column_selection").value;

// parsing the preprocessed data onto the front end
function searchForData() {
  const dataRequest = new XMLHttpRequest();
  dataRequest.onload = function () {
    if (searchFilter=="None") {
      displayData()
    } else {
      displayData()
    }
  }
  dataRequest.open('GET',fileData)
  dataRequest.send()
}
