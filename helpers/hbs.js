const moment = require("moment");

module.exports = {
    generateDate: (date,format) => {
        return moment(date).format(format);
    },
    limit: (arr,limit) => {
        if(!Array.isArray(arr)){
            return [];
        } 
        return arr.slice(0,limit);
    },
    truncate: (str,len) => {
        if(str.length > len) {
            str = str.substring(0,len) + "...";
        }
        return str;
    },
    paginate: (options) => {
        console.log(options);

        let outputHTML = "";

        if(options.hash.current === 1)
        {
            outputHTML += `<li class="page-item" disabled><a class="page-link" href="">İlk</a></li>`;
        }
        else
        {
            outputHTML += `<li class="page-item" disabled><a class="page-link" href="?page=1">İlk</a></li>`;
        }

        let i = (Number(options.hash.current) > 5 ? Number(options.hash.current) - 4 : 1);

        if(i!==1)
        {
            outputHTML += `<li class="page-item" disabled><a class="page-link" href="">...</a></li>`;
        }

        for(;i<= (Number(options.hash.current) + 4) && i <= options.hash.pages;i++)
        {
            if (i === options.hash.current)
            {
                outputHTML += `<li class="page-item" active><a class="page-link">${i}</a></li>`;
            }
            else
            {
                outputHTML += `<li class="page-item"><a class="page-link" href="?page=${i}">${i}</a></li>`;
            }

            if (i == Number(options.hash.current) + 4 && i < options.hash.pages)
            {
                outputHTML += `<li class="page-item" disabled><a class="page-link" href="">...</a></li>`;
            }

        }

        if(options.hash.current == options.hash.pages)
        {
            outputHTML += `<li class="page-item" disabled><a class="page-link">Son</a></li>`;
        }
        else
        {
            outputHTML += `<li class="page-item"><a class="page-link" href="?page=${options.hash.pages}">Son</a></li>`;
        }

        return outputHTML;

    }
}