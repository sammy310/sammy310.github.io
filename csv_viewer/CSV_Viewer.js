
const FirstDataDate = new Date(2020, 6, 1);
const PriceDataChangeDate = new Date(2021, 8, 25);
const TodayDate = new Date();

const CSVViewerURL = 'https://sammy310.github.io/csv_viewer/CSV_Viewer.html?';
const CSVCategoryURL = 'https://raw.githubusercontent.com/sammy310/Danawa-Crawler/master/CrawlingCategory.csv';
const CurrentCSVDataURL = 'https://raw.githubusercontent.com/sammy310/Danawa-Crawler/master/crawl_data/';
const LastCSVDataURL = 'https://raw.githubusercontent.com/sammy310/Danawa-Crawler/master/crawl_data/Last_Data/';

const OldFormattedCategory = ['CPU', 'RAM', 'VGA', 'MBoard', 'SSD', 'HDD', 'Power', 'Cooler', 'Case', 'Monitor'];
const StorageCategory = ['RAM', 'SSD', 'HDD'];

var CategoryList = new Array();
var ProductName = new Array();

var categoryName;
var categoryIndex = 0;
var requestDate = null;
var filterText;

var isLastFormattedData = false;


const CategoryKey_Name = 'name';
const CategoryKey_URL = 'url';

const Parameter_Category = 'category'
const Parameter_Date = 'date'
const Parameter_Filter = 'search'

var tableHTMLDict = {}
var isCSVRequest = false;


function main() {
    GetCategoryData();
}


function GetCategoryData() {
    var categoryRequest = new XMLHttpRequest();
    categoryRequest.onreadystatechange = function() {
        if (categoryRequest.readyState === categoryRequest.DONE) {
            if (categoryRequest.status === 200 || categoryRequest.status === 201) {
                var categoryData = categoryRequest.responseText.split('\n');
                categoryData.forEach(col => {
                    if (col.trim().length > 0 && col.startsWith('//') == false) {
                        categoryArr = CSVStrToArr(col);
                        CategoryList.push({name: categoryArr[0], url: categoryArr[1]});
                    }
                });

                OnGetCategoryData();

                return;
            }

            // Error
            GetTable().innerHTML = 'Failed to load data!!';
        }
    }

    categoryRequest.open('GET', CSVCategoryURL);

    categoryRequest.send();
}

function OnGetCategoryData() {
    GetRequestInfo();
    CreateTable();
    CreateMenu();
}


function GetTable() {
    return document.getElementById('table');
}

function GetRequestInfo() {
    categoryName = getParameterByName(Parameter_Category);
    requestDate = getParameterByName(Parameter_Date);
    filterText = getParameterByName(Parameter_Filter);

    if (categoryName == '') {
        categoryIndex = 0;
        categoryName = CategoryList[categoryIndex][CategoryKey_Name];
    }
    else {
        var isDataCorrect = false;
        for (categoryIndex = 0; categoryIndex < CategoryList.length; categoryIndex++) {
            if (CategoryList[categoryIndex][CategoryKey_Name].toUpperCase() == categoryName.toUpperCase()) {
                categoryName = CategoryList[categoryIndex][CategoryKey_Name];
                isDataCorrect = true;
                break;
            }
        }

        if (isDataCorrect == false) {
            categoryIndex = 0;
            categoryName = CategoryList[categoryIndex][CategoryKey_Name];
        }
    }

    if (!requestDate) {
        requestDate = GetTodayDateStr();
    }
    isLastFormattedData = (requestDate.substr(0, 4) <= PriceDataChangeDate.getFullYear() && requestDate.substr(4) <= (PriceDataChangeDate.getMonth()+1));
}

function GetCSVURL(dateStr) {
    var csvDataURL = '';

    if (dateStr && dateStr.length == 6 && dateStr != GetTodayDateStr()) {
        csvDataURL = LastCSVDataURL;
        csvDataURL += dateStr.substr(0, 4) + '-' + dateStr.substr(4) + '/';
    }
    else {
        csvDataURL = CurrentCSVDataURL;
    }

    csvDataURL += categoryName + '.csv';

    return csvDataURL;
}

function GetTableHTMLDictKey() {
    return categoryName + '_' + requestDate;
}

function CreateTable() {
    if (isCSVRequest == true) return;

    var htmlDataKey = GetTableHTMLDictKey();
    if (tableHTMLDict[htmlDataKey] == undefined) {
        RequestCSVData();
    }
    else {
        GetTable().innerHTML = tableHTMLDict[htmlDataKey];
    }

    UpdateMenu();
}

function RequestCSVData() {
    var csvDataURL = GetCSVURL(requestDate);

    var dataRequest = new XMLHttpRequest();
    dataRequest.onreadystatechange = function() {
        try {
            if (dataRequest.readyState === dataRequest.DONE) {
                if (dataRequest.status === 200) {
                    ProductName = [];

                    var colCount = 1;
                    var csvData = dataRequest.responseText.split('\n');
                    csvData.pop();
                    var tableStr = '';
                    csvData.forEach(col => {
                        if (colCount == 1){
                            tableStr += '<thead>';
                        }
                        else if (colCount == 2) {
                            tableStr += '<tbody>';
                        }
                        tableStr += '<tr id="LC' + colCount + '" class="col">';
                        tableStr += '<td id="L' + colCount + '" class="line-number">' + colCount + '</td>';

                        var rowCount = -1;
                        var productId;
                        CSVStrToArr(col).forEach(row => {
                            var newStr = row;
                            if (colCount > 1) {
                                if (rowCount == -1) {
                                    productId = row;
                                }
                                else if (rowCount == 0) {
                                    newStr = '<a href="http://prod.danawa.com/info/?pcode=' + productId + '" target="_blank">' + newStr + '</a>';
                                    ProductName.push(row);
                                }
                                else {
                                    newStr = FormattingDataStr(row, rowCount);
                                }
                            }

                            if (colCount == 1) {
                                tableStr += '<th>' + newStr + '</th>';
                            }
                            else {
                                tableStr += '<td>' + newStr + '</td>';
                            }

                            rowCount++;
                        });
                        
                        tableStr += '</tr>';
                        if (colCount == 1) {
                            tableStr += '</thead>';
                        }

                        colCount++;
                    });
                    tableStr += '</tbody>';

                    tableHTMLDict[GetTableHTMLDictKey()] = tableStr;
                    GetTable().innerHTML = tableStr;

                    if (filterText) {
                        document.getElementById('input_filter').value = filterText;
                        FindProduct(filterText);
                    }

                    isCSVRequest = false;
                    SetLoading(false);

                    return;
                }
                else if (dataRequest.status === 404) {
                    if (requestDate != GetTodayDateStr()) {
                        requestDate = GetTodayDateStr();
                        CreateTable();
                    }
                }
            }
        }
        catch {
            
        }
    };

    dataRequest.open('GET', csvDataURL);

    isCSVRequest = true;
    SetLoading(true);
    dataRequest.send();
}


function CSVStrToArr(csvStr) {
    var csvArr = new Array();
    var tempStr = new String();
    var isStrSplit = false;
    csvStr.split(',').forEach(val => {
        val = val.trim();
        if (val[0] == '"') {
            isStrSplit = true;
            tempStr = val.substr(1);
        }
        else if (val[val.length - 1] == '"') {
            isStrSplit = false;
            tempStr += ',' + val.substr(0, val.length - 1);
            csvArr.push(tempStr);
        }
        else {
            if (isStrSplit == true) {
                tempStr += ',' + val;
            }
            else {
                csvArr.push(val);
            }
        }
    });
    
    return csvArr;
}

function FormattingDataStr(dataStr, dataIndex) {
    if (OldFormattedCategory.includes(categoryName) && isLastFormattedData && dataIndex < PriceDataChangeDate.getDate()) { // Old Format
        if (categoryName == 'CPU') {
            return CPUStr(dataStr);
        }
        else if (StorageCategory.includes(categoryName)) {
            return StorageStr(categoryName, dataStr);
        }
        else {
            return dataStr;
        }
    }
    else { // New Format
        return dataStr.replace(/\|/g, '<br>').replace(/_/g, ' - ');
    }
}

function CPUStr(cpuStr){
    return cpuStr.replace(/ /g, '<br>').replace(/_/g, ' : ');
}

function StorageStr(storageDataType, storageStr){
    var newStr = new String();
    var count = 0;
    var tempStr = new String();
    
    if (storageDataType == 'HDD') {
        storageStr.split(' ').forEach(val => {
            if (count%2 == 0) {
                tempStr += val;
            }
            else {
                tempStr += ' ' + val + '<br>';
            }
            count++;
        });
    }
    else {
        tempStr = storageStr.replace(/ /g, '<br>');
    }

    count = 0;
    tempStr.split('_').forEach(val => {
        if (count%2 == 0){
            newStr += val;
        }
        else {
            newStr += ' - ' + val + ' : ';
        }
        count++;
    });
    
    return newStr;
}

function ResetFind(){
    var cols = document.getElementsByClassName('col');
    for (var i=0; i < cols.length; i++) {
        cols.item(i).removeAttribute('hidden');
    }
}

function FindProduct(findStr){
    var cols = document.getElementsByClassName('col');
    for (var i=0; i < cols.length; i++) {
        cols.item(i).setAttribute('hidden', '');
    }

    document.getElementById('LC1').removeAttribute('hidden');

    var count=2;
    ProductName.forEach(name => {
        if (name.toLowerCase().indexOf(findStr.toLowerCase()) != -1) {
            document.getElementById('LC' + count).removeAttribute('hidden');
        }
        count++;
    });
}


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function FilterValueChange(){
    if (document.getElementById('input_filter').value == "") ResetFind();
    FindProduct(document.getElementById('input_filter').value);
}


function CreateMenu() {
    var menuStr = ""

    menuStr += '<div id="category">';
    for (var index = 0; index < CategoryList.length; index++) {
        menuStr += '<li class="menu-item category" data-category-name="' + CategoryList[index][CategoryKey_Name] + '"><a href="#">' + CategoryList[index][CategoryKey_Name] + '</a></li>';
    }
    menuStr += '</div>';

    menuStr += '<hr>';

    menuStr += '<div id="last_data"></div>';
    
    menuStr += '<hr>';
    
    menuStr += '<li class="menu-item"><a href="https://github.com/sammy310" target="_blank">GitHub</a></li>';

    
    document.getElementById('menu_list').innerHTML = menuStr;

    // Category
    var menu = GetCategoryMenu();
    for (var index = 0; index < menu.length; index++) {
        menu[index].addEventListener('click', function() {
            categoryName = this.dataset.categoryName;
            CreateTable();
            CheckAllLastDataMenu();
        });
    };

    // Last Data
    AddLastDateMenu();

    menu = GetLastDateMenu();
    for (var index = 0; index < menu.length; index++) {
        menu[index].addEventListener('click', function() {
            requestDate = this.dataset.date;
            CreateTable();
        });
    };

    UpdateMenu();
    CheckAllLastDataMenu();
}

function AddLastDateMenu() {
    var firstDate = FirstDataDate;
    var lastDataDate = new Date();

    while (firstDate < lastDataDate) {
        var dateStr = GetDateStr(lastDataDate);
        var printDateStr = dateStr.substr(0, 4) + '년 ' + dateStr.substr(4) + '월 데이터';

        document.getElementById('last_data').innerHTML += '<li class="menu-item last_data" id="last_data-' + dateStr + '" data-date="' + dateStr + '"><a href="#">' + printDateStr + '</a></li>';

        lastDataDate.setMonth(lastDataDate.getMonth() - 1);
    }
}

function CheckLastDataMenu(dateStr) {
    if (dateStr != GetTodayDateStr()) {
        var request = new XMLHttpRequest();
        request.open('GET', GetCSVURL(dateStr), true);
        request.onreadystatechange = function() {
            try {
                if (request.readyState === request.DONE) {
                    if (request.status === 404) {
                        document.getElementById('last_data-' + dateStr).hidden = true;//.remove();
                    }
                    else if (request.status === 200) {
                        document.getElementById('last_data-' + dateStr).hidden = false;
                    }
                }
            }
            catch {

            }
        }
        request.send();
    }
}

function CheckAllLastDataMenu() {
    var menu = GetLastDateMenu();
    for (var index = 0; index < menu.length; index++) {
        CheckLastDataMenu(menu[index].dataset.date);
    }
}

function GetCategoryMenu() {
    return document.getElementsByClassName('menu-item category');
}

function GetLastDateMenu() {
    return document.getElementsByClassName('menu-item last_data');
}

function UpdateMenu() {
    var menu = GetCategoryMenu();
    for (var index = 0; index < menu.length; index++) {
        if (menu[index].dataset.categoryName == categoryName) {
            menu[index].classList.add('currentItem');
        }
        else {
            menu[index].classList.remove('currentItem');
        }
    }

    menu = GetLastDateMenu();
    for (var index = 0; index < menu.length; index++) {
        if (menu[index].dataset.date == requestDate) {
            menu[index].classList.add('currentItem');
        }
        else {
            menu[index].classList.remove('currentItem');
        }
    }
}

function GetDateStr(date) {
    var dateStr = String(date.getFullYear());
    if (date.getMonth()+1 < 10) {
        dateStr += '0';
    }
    dateStr += (date.getMonth()+1);

    return dateStr;
}

function GetTodayDateStr() {
    return GetDateStr(TodayDate);
}


function SetLoading(isShow) {
    document.getElementById('loading').hidden = !isShow;
}
