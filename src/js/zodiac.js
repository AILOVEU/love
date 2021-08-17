/**
 * 获取C值
 * @return {Number} C
 */
function getC(year) {
    var _year = Math.floor(year / 100) + 1;
    var C;
    switch (_year) {
        case 20:
            C = 4.6295;
            break;
        case 21:
            C = 3.87;
            break;
        case 22:
            C = 4.15;
            break;
        default:
            C = 3.87;
    }
    return C;
}
/**
 * 获取立春日 一般都在2月
 * @return {Number} springDay
 */
function getSpringDay(year) {
    var Y = year % 100,
        D = 0.2422,
        C = getC(),
        L = (Y - 1) / 4,
        springDay = 0;
    springDay = Math.floor(Y * D + C) - Math.floor((Y - 1) / 4);
    return springDay;
}
function getZodiac(date = new Date()) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let zodiac = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
    let myPos = (year - 1900) % 12;
    let myZodiac = zodiac[myPos];
    let springDay = getSpringDay(year);
    switch (month) {
        case 1:
            var _myPos = myPos - 1;
            if (_myPos < 0) {
                _myPos = 11;
            }
            myZodiac = zodiac[_myPos];
            break;
        case 2:
            if (day < springDay) {
                var _myPos = myPos - 1;
                if (_myPos < 0) {
                    _myPos = 11;
                }
                myZodiac = zodiac[_myPos];
            }
            break;
    }
    return myZodiac;

}
// 计算季节
function getSeason(date=new Date()) {
    let month = date.getMonth() + 1;
    // if([12,1,2].includes(month)) {
    //     return '冬天(12、1、2月)';
    // }else if([3,4,5].includes(month)) {
    //     return '春天(3、4、5月)';
    // }else if([6,7,8].includes(month)) {
    //     return '夏天(6、7、8月)';
    // }else {
    //     return '秋天(9、10、11月)';
    // }
    if([12,1,2].includes(month)) {
        return '冬天';
    }else if([3,4,5].includes(month)) {
        return '春天';
    }else if([6,7,8].includes(month)) {
        return '夏天';
    }else {
        return '秋天';
    }
}

export {
    getZodiac,
    getSeason
};