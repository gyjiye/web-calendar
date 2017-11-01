// ===============global variables=============================
var now = new Date(),
    YEAR = now.getFullYear(),
    MONTH = now.getMonth()+1,
    DATE = now.getDate(), // 日期
    DAY = now.getDay(); // 星期几

// =============== END global variables=============================

// update time title
function update_time_title() {
    var month_str = ['January', 'February', 'March', 'April','May','June','July','August','September','October','November','December'];
    var $date = $('#data');
    if($date !== undefined) {
        var date_content = month_str[MONTH-1] + ' ' + DATE;
    }
    $date.text(date_content);
}

update_time_title();

// 计算明天日期
function tomorrow_date (y,m,d){ //参数里的月份需要是自然月。也就是说月份+1这步在传参前就设置好
    var run = false;    //判断是否是闰年
    if (!(y%4)) {       //如果年份是4的整数倍
        if (!(y%100)) {     //如果是整百年
            if (!(y%400)) {     //如果是400的整数
                run = true;
            }
        }else{
            run = true;
        }
    }

    if(d==28&&m==2){    //2月28日
        if(!run) {  //非闰年
            d=1;
            m++;
        }else{  //闰年
            d++;
        }
    }else if(d==29&&m==2){  //2月29日
        d=1;
        m++;
    }else if(d==30&&(m==4||m==6||m==9||m==11)){    //30天的月份里的第30天
        d=1;
        m++;
    }else if(d==31){            //31天的月份里的第31天
        d=1;
        if (m==12){    //如果是12月则进入下一年
            m=1;
            y++;
        }else{
            m++;
        }
    }else{      //如果今天不是月份的最后一天
        d++;
    }

    return [y, m, d];
}

