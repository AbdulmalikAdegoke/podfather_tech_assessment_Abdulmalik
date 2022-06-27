// variable for storing the file data
let fileData=[];
// column names array for aiding the row data iteration
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
    // error alert for situations when the file has not been imported
    alert("File not imported.");
  }
}
// displaying the preprocessed data onto the front end
function displayData(dataToDisplay,filterOption="None") {
  // displaying the section of front end containing the table
  document.getElementById("search_results_container").style.visibility="visible";

  // variable to contain the row elements
  let tableToDisplay ="<tr>";

  // iterating through the csv data to create the rows of the data table
  dataToDisplay.data.map((row)=>{
    columns.forEach((columnName, i) => {
      if (columnName=="Late") {
        row[columnName]=="Late"?tableToDisplay += "<td class=\"table-warning\">" + row[columnName] + "</td>": tableToDisplay += "<td class=\"table-success\>" + row[columnName] + "</td>";
      } else if (columnName=="Flagged") {
        row[columnName]=="Flagged"?tableToDisplay += "<td class=\"table-danger\">" + row[columnName] + "</td>": tableToDisplay += "<td>" + row[columnName] + "</td>";
      } else {
        tableToDisplay += "<td>" + row[columnName] + "</td>";
      }
    });
    tableToDisplay +="</tr>";
  }
  )

  // displaying the table
  document.getElementById("table_body").innerHTML=tableToDisplay;
}

let searchFilter = document.getElementById("column_selection").value;

// function responsible for the filtering and searching of the retrieved table results
function filterSearch() {
  let searchFilter = document.getElementById("column_selection").value;
  console.log(fileData);
}

// parsing the preprocessed data onto the front end
function searchForData() {
  const dataRequest = new XMLHttpRequest();
  dataRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // console.log(JSON.parse(this.responseText));
        console.log(this.responseText);
    }
  };
  // dataRequest.onload = function () {
  //   try {
  //     console.log(JSON.parse(this.responseText));
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   // if (searchFilter=="None") {
  //   //   displayData()
  //   // } else {
  //   //   displayData()
  //   // }
  // }
  dataRequest.open('GET',"pod-data.txt");
  dataRequest.send();
}

// function for clearing the imported table
function clearTable() {
  document.getElementById("table_body").innerHTML="";
  // displaying the section of front end containing the table
  document.getElementById("search_results_container").style.visibility="hidden";
}
