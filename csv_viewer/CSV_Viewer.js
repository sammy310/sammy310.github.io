
var ComPartsCSVData = {
'CPU':'https://raw.githubusercontent.com/sammy310/Danawa_Crawler/master/crawl_data/CPU.csv',
'VGA':'https://raw.githubusercontent.com/sammy310/Danawa_Crawler/master/crawl_data/VGA.csv',
'MBoard':'https://raw.githubusercontent.com/sammy310/Danawa_Crawler/master/crawl_data/MBoard.csv',
'RAM':'https://raw.githubusercontent.com/sammy310/Danawa_Crawler/master/crawl_data/RAM.csv',
'SSD':'https://raw.githubusercontent.com/sammy310/Danawa_Crawler/master/crawl_data/SSD.csv',
'HDD':'https://raw.githubusercontent.com/sammy310/Danawa_Crawler/master/crawl_data/HDD.csv',
'Cooler':'https://raw.githubusercontent.com/sammy310/Danawa_Crawler/master/crawl_data/Cooler.csv',
'Case':'https://raw.githubusercontent.com/sammy310/Danawa_Crawler/master/crawl_data/Case.csv',
'Power':'https://raw.githubusercontent.com/sammy310/Danawa_Crawler/master/crawl_data/Power.csv'}

var ProductName = new Array();
var FilterText;


function GetTable() {
    return document.getElementById('table');
}

function CreateTable(dataType) {
    var tableStr = "";

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
                            if(dataType == 'SSD' || dataType == 'HDD'){
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

                if(FilterText != '') {
                    document.getElementById('input_filter').value = FilterText;
                    FindProduct(FilterText);
                }

            } else {
                // console.error(dataRequest.responseText);
            }
        }
    };
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
    CreateTable(GetParam());
}


function GetParam(){
    var url = location.href;
    var paramStr = url.substr(url.indexOf('?') + 1, url.length).toLowerCase();
    var paramArr = paramStr.split('&');

    FilterText = (paramArr.length>1) ? decodeURIComponent(paramArr[1]) : '';

    if(paramArr[0].indexOf('cpu') != -1){
        return 'CPU';
    }
    else if(paramArr[0].indexOf('vga') != -1){
        return 'VGA';
    }
    else if(paramArr[0].indexOf('mboard') != -1){
        return 'MBoard';
    }
    else if(paramArr[0].indexOf('ram') != -1){
        return 'RAM';
    }
    else if(paramArr[0].indexOf('ssd') != -1){
        return 'SSD';
    }
    else if(paramArr[0].indexOf('hdd') != -1){
        return 'HDD';
    }
    else if(paramArr[0].indexOf('cooler') != -1){
        return 'Cooler';
    }
    else if(paramArr[0].indexOf('case') != -1){
        return 'Case';
    }
    else if(paramArr[0].indexOf('power') != -1){
        return 'Power';
    }
    else{
        return 'CPU';
    }
}

function FilterValueChange(){
    if(document.getElementById('input_filter').value == "") ResetFind();
    FindProduct(document.getElementById('input_filter').value);
}