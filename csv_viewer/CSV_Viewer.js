
var FirstDataDate = new Date(2020, 6, 1)

var ComPartsCSVData = {
'CPU':'https://raw.githubusercontent.com/sammy310/Danawa_Crawler/master/crawl_data/CPU.csv',
'VGA':'https://raw.githubusercontent.com/sammy310/Danawa_Crawler/master/crawl_data/VGA.csv',
'MBoard':'https://raw.githubusercontent.com/sammy310/Danawa_Crawler/master/crawl_data/MBoard.csv',
'RAM':'https://raw.githubusercontent.com/sammy310/Danawa_Crawler/master/crawl_data/RAM.csv',
'SSD':'https://raw.githubusercontent.com/sammy310/Danawa_Crawler/master/crawl_data/SSD.csv',
'HDD':'https://raw.githubusercontent.com/sammy310/Danawa_Crawler/master/crawl_data/HDD.csv',
'Cooler':'https://raw.githubusercontent.com/sammy310/Danawa_Crawler/master/crawl_data/Cooler.csv',
'Case':'https://raw.githubusercontent.com/sammy310/Danawa_Crawler/master/crawl_data/Case.csv',
'Power':'https://raw.githubusercontent.com/sammy310/Danawa_Crawler/master/crawl_data/Power.csv',
'Monitor':'https://raw.githubusercontent.com/sammy310/Danawa_Crawler/master/crawl_data/Monitor.csv'}

var CSVViewerURL = 'https://sammy310.github.io/csv_viewer/CSV_Viewer.html?'
var LastComPartsCSVData = 'https://raw.githubusercontent.com/sammy310/Danawa-Crawler/master/crawl_data/Last_Data/'

var StorageType = ['RAM', 'SSD', 'HDD']

var ProductName = new Array();

var dataType

function GetTable() {
    return document.getElementById('table');
}

function CreateTable() {
    var tableStr = "";

    dataType = getParameterByName('data').toUpperCase();
    var dataDate = getParameterByName('date');
    var FilterText = getParameterByName('search');

    if (dataType == "")
        dataType = 'CPU'
    else {
        var isDataCorrect = false
        for (var key in ComPartsCSVData) {
            if (dataType == key.toUpperCase()) {
                dataType = key
                isDataCorrect = true
                break
            }
        }

        if (isDataCorrect == false)
            dataType = 'CPU'
    }

    
    var dataRequest = new XMLHttpRequest();
    dataRequest.onreadystatechange = function() {
        if (dataRequest.readyState === dataRequest.DONE) {
            if (dataRequest.status === 200 || dataRequest.status === 201) {
                ProductName = [];

                var colCount = 1;
                var csvData = dataRequest.responseText.split('\n');
                csvData.pop();
                tableStr = "";
                csvData.forEach(col => {
                    if(colCount == 1){
                        tableStr += '<thead>'
                    }
                    else if(colCount == 2){
                        tableStr += '<tbody>'
                    }
                    tableStr += '<tr id="LC' + colCount + '" class="col">';
                    tableStr += '<td id="L' + colCount + '" class="line-number">' + colCount + '</td>';

                    var rowCount = 0;
                    var productId;
                    CSVStrToArr(col).forEach(row => {
                        var newStr = row;
                        
                        if(rowCount == 0){
                            productId = row;
                        }
                        else if(rowCount == 1){
                            if(colCount > 1){
                                newStr = '<a href="http://prod.danawa.com/info/?pcode=' + productId + '" target="_blank">' + newStr + '</a>';
                                ProductName.push(row);
                            }
                        }
                        else{
                            if(dataType == 'CPU'){
                                newStr = CPUStr(row);
                            }
                            if(StorageType.includes(dataType)){
                                newStr = StorageStr(dataType, row);
                            }
                        }

                        if(colCount == 1){
                            tableStr += '<th>' + newStr + '</th>';
                        }
                        else{
                            tableStr += '<td>' + newStr + '</td>';
                        }

                        rowCount++;
                    });
                    
                    tableStr += '</tr>';
                    if(colCount == 1){
                        tableStr += '</thead>'
                    }

                    colCount++;
                });
                tableStr += '</tbody>'

                GetTable().innerHTML = tableStr;

                if(FilterText) {
                    document.getElementById('input_filter').value = FilterText;
                    FindProduct(FilterText);
                }

            } else {
                // console.error(dataRequest.responseText);
            }
        }
    };

    if (dataDate && dataDate.length == 6) {
        var lastDataURL = LastComPartsCSVData;

        lastDataURL += dataDate.substr(0, 4) + '-' + dataDate.substr(4) + '/';

        lastDataURL += dataType + '.csv'
        
        dataRequest.open('GET', lastDataURL);
    }
    else
        dataRequest.open('GET', ComPartsCSVData[dataType]);

    dataRequest.send();

}

function CSVStrToArr(csvStr){
    var csvArr = new Array();
    var tempStr = new String();
    var isStrSplit = false;
    csvStr.split(',').forEach(val => {
        if(val[0] == '"'){
            isStrSplit = true;
            tempStr = val.substr(1);
        }
        else if(val[val.length - 1] == '"'){
            isStrSplit = false;
            tempStr += ',' + val.substr(0, val.length - 1);
            csvArr.push(tempStr);
        }
        else{
            if(isStrSplit == true){
                tempStr += ',' + val;
            }
            else{
                csvArr.push(val);
            }
        }
    });
    
    return csvArr;
}

function CPUStr(cpuStr){
    return cpuStr.replace(/ /g, '<br>').replace(/_/, ' : ');
}

function StorageStr(storageDataType, storageStr){
    var newStr = new String();
    var count = 0;
    var tempStr = new String();
    
    if(storageDataType == 'HDD'){
        storageStr.split(' ').forEach(val => {
            if(count%2 == 0){
                tempStr += val;
            }
            else{
                tempStr += ' ' + val + '<br>';
            }
            count++;
        });
    }
    else{
        tempStr = storageStr.replace(/ /g, '<br>');
    }

    count = 0;
    tempStr.split('_').forEach(val => {
        if(count%2 == 0){
            newStr += val;
        }
        else{
            newStr += ' - ' + val + ' : ';
        }
        count++;
    });
    
    return newStr;
}

function ResetFind(){
    var cols = document.getElementsByClassName('col');
    for(var i=0; i < cols.length; i++){
        cols.item(i).removeAttribute('hidden');
    }
}

function FindProduct(findStr){
    var cols = document.getElementsByClassName('col');
    for(var i=0; i < cols.length; i++){
        cols.item(i).setAttribute('hidden', '');
    }

    document.getElementById('LC1').removeAttribute('hidden');

    var count=2;
    ProductName.forEach(name => {
        if(name.toLowerCase().indexOf(findStr.toLowerCase()) != -1){
            document.getElementById('LC' + count).removeAttribute('hidden');
        }
        count++;
    });
}

function main() {
    CreateTable();
    CreateMenu();
}


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function FilterValueChange(){
    if(document.getElementById('input_filter').value == "") ResetFind();
    FindProduct(document.getElementById('input_filter').value);
}


function CreateMenu() {
    var menuStr = ""

    for (var key in ComPartsCSVData) {
        menuStr += '<li class="menu-item"><a href="' + CSVViewerURL + 'data=' + key + '">' + key + '</a></li>'
    }


    menuStr += '<hr>'


    var lastDataDate = FirstDataDate
    var today = new Date()
    while (lastDataDate < today) {
        var printDateStr = String(lastDataDate.getFullYear()) + '년 '
        var dateStr = String(lastDataDate.getFullYear())
        if (lastDataDate.getMonth()+1 < 10) {
            printDateStr += '0'
            dateStr += '0'
        }
        printDateStr += String(lastDataDate.getMonth()+1) + '월 데이터'
        dateStr += (lastDataDate.getMonth()+1)

        if (lastDataDate.getFullYear() == today.getFullYear() && lastDataDate.getMonth() == today.getMonth())
            menuStr += '<li class="menu-item"><a href="' + CSVViewerURL + 'data=' + dataType + '">' + printDateStr + '</a></li>'
        else
            menuStr += '<li class="menu-item"><a href="' + CSVViewerURL + 'data=' + dataType + '&date=' + dateStr + '">' + printDateStr + '</a></li>'

        lastDataDate.setMonth(lastDataDate.getMonth() + 1)
    }
    
    
    menuStr += '<hr>'
    
    
    menuStr += '<li class="menu-item"><a href="https://github.com/sammy310" target="_blank">GitHub</a></li>'

    
    document.getElementById('menu_list').innerHTML = menuStr
}
