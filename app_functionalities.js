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
        row[columnName]=="Late"?tableToDisplay += "<td class=\"table-warning\">" + row[columnName] + "</td>": tableToDisplay += "<td class=\"table-success\">" + row[columnName] + "</td>";
      } else if (columnName=="Flagged") {
        row[columnName]=="Flagged"?tableToDisplay += "<td class=\"table-danger\">" + row[columnName] + "</td>": tableToDisplay += "<td class=\"table-info\">" + row[columnName] + "</td>";
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

// displaying the preprocessed search data onto the front end
function displaySearchData(dataToDisplay) {
  // displaying the section of front end containing the table
  document.getElementById("search_results_container").style.visibility="visible";

  // variable to contain the row elements
  let tableToDisplay ="<tr>";

  // iterating through the csv data to create the rows of the data table
  dataToDisplay.map((row)=>{
    columns.forEach((columnName, i) => {
      if (columnName=="Late") {
        row[columnName]=="Late"?tableToDisplay += "<td class=\"table-warning\">" + row[columnName] + "</td>": tableToDisplay += "<td>" + row[columnName] + "</td>";
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

// select menu
let chosenOption = document.getElementById("column_selection");
// filter option chosen
let searchFilter = chosenOption.options[chosenOption.selectedIndex].value;

// function responsible for the filtering and searching of the retrieved table results
function filterSearch(csvFileData,filterOption,searchQuery) {
  // let searchFilter = document.getElementById("column_selection").value;

  csvFileData.map((row,index)=>{
    let cellContent = row[filterOption].toString();
    if(!cellContent.includes(searchQuery)){csvFileData.splice(index, 1)};
  }
  )
  // preprocessing the data
  csvFileData.map((row)=>{
    row["Late"]==0?row["Late"]="On Time":row["Late"]="Late";
    row["Flagged"]==0?row["Flagged"]="Not Flagged":row["Flagged"]="Flagged";
  }
  )

  // console.log(csvFileData);
  return csvFileData; // filtered search results
}

// parsing the preprocessed data onto the front end
function searchForData() {
  // request initialisation
  const dataRequest = new XMLHttpRequest();

  //
  dataRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("table_body").innerHTML=""; // resets the table section
      // parsing json to array of objects
      let csvFileData = JSON.parse(this.responseText);
      // searched word/ query to the server
      let searchWord = document.getElementById("pod_data_query").value;

      // tests for data availability
      console.log(csvFileData);
      console.log(searchWord);
      console.log(searchFilter);

      // search error handling
      if (searchWord=="") {
        alert("No search input");
      } else {
        if (searchFilter=="None") {
          displaySearchData(csvFileData);
        } else {
          csvFileData = filterSearch(csvFileData,searchFilter,searchWord.toString());
          console.log(csvFileData);
          displaySearchData(csvFileData);
        }

      }

    }
  };
  // request from server
  dataRequest.open('GET',"pod-data.txt");
  dataRequest.send();
}

// function for clearing the imported table
function clearTable() {
  document.getElementById("table_body").innerHTML="";
  // displaying the section of front end containing the table
  document.getElementById("search_results_container").style.visibility="hidden";
}
