hennge.mails = {
    isEmpty: function () {
        return document.querySelectorAll("#datatable tbody tr").length == 1;
    },
    $data: [],
    $selectedDate: new Date(),
    _viewDidLoad: ['init', 'checkTableState', 'addFixtures', 'fillTableWithData', 'setSearchByDate'],
    init: function () {
        $('#search-by-date__button').on('click', function () {
            hennge.mails.filterTableByDate(hennge.mails.$selectedDate)
        })
    },
    checkTableState: function () {
        if (hennge.mails.isEmpty() || this.$data.length == 0) {
            hennge.mails.showEmptyLogo();
            $('#ttitles').hide();
        } else {
            $('#ttitles').show();
        }
    },

    addFixtures: function () {
        this.$data = [{
                from: 'aaa1@example.com',
                to: 'zzzz.zzzz@example.com',
                subject: '[HR-8888] Noticed of official announcement',
                attachment: '',
                "datetime": new Date(),
                body: 'this is the fake body '
            },
            {
                from: 'aaa2@example.com',
                to: 'zzzz.zzzz@example.com',
                subject: '[HR-8888] Noticed of official announcement',
                attachment: '',
                "datetime": "2020-11-23T15:15:00+0200",
                body: 'this is the fake body '
            },
            {
                from: 'aaa@example.com',
                to: 'zzzz.zzzz@example.com, other@me.com',
                subject: '[HR-8888] Noticed of official announcement',
                attachment: '',
                "datetime": "2017-08-18T15:15:00+0200",
                body: 'this is the fake body '
            },
            {
                from: 'aaa@example.com',
                to: 'zzzz.zzzz@example.com, other@me.com',
                subject: '[HR-8888] Noticed of official announcement',
                attachment: 's',
                "datetime": "2017-08-18T15:15:00+0200",
                body: 'this is the fake body '
            },
            {
                from: 'aaa@example.com',
                to: 'zzzz.zzzz@example.com, other@me.com, other@melo.com',
                subject: '[HR-8888] Noticed of official announcement',
                attachment: '',
                "datetime": "2017-08-18T15:15:00+0200",
                body: 'this is the fake body '
            },
            {
                from: 'aaa@example.com',
                to: 'zzzz.zzzz@example.com',
                subject: '[HR-8888] Noticed of official announcement',
                attachment: '',
                "datetime": "2017-08-18T15:15:00+0200",
                body: 'this is the fake body '
            },
            {
                from: 'aaa@example.com',
                to: 'zzzz.zzzz@example.com',
                subject: '[HR-8888] Noticed of official announcement',
                attachment: 's',
                "datetime": "2017-08-18T15:15:00+0200",
                body: 'this is the fake body '
            },
            {
                from: 'aaa@example.com',
                to: 'zzzz.zzzz@example.com',
                subject: '[HR-8888] Noticed of official announcement',
                attachment: 's',
                "datetime": "2017-08-18T15:15:00+0200",
                body: 'this is the fake body '
            },
            {
                from: 'aaa@example.com',
                to: 'zzzz.zzzz@example.com',
                subject: '[HR-8888] Noticed of official announcement',
                attachment: '',
                "datetime": "2017-08-18T15:15:00+0200",
                body: 'this is the fake body '
            },
            {
                from: 'aaa@example.com',
                to: 'zzzz.zzzz@example.com',
                subject: '[HR-8888] Noticed of official announcement',
                attachment: '',
                "datetime": "2017-08-18T15:15:00+0200",
                body: 'this is the fake body '
            },

        ]
    },
    showEmptyLogo: function () {
        $("#datatable tbody").empty();
        $tr = '<tr><td class="empty_table__row" colspan="4"><div class="empty_table"><img src="./static/images/logo.png" alt="empty"></div></td></tr>'
        $("#datatable tbody").append($tr);
        return
    },
    fillHeaderWithData: function () {
        $('#mail_count').html('Results:' + hennge.mails.$data.length + ' mail(s)')
    },
    fillTableWithData: function () {
        $("#datatable tbody").empty();
        hennge.mails.fillHeaderWithData();

        for (let i = 0; i < hennge.mails.$data.length; i++) {
            $("#datatable tbody").append(hennge.mails.createRow(hennge.mails.$data[i]));
        }

        this.checkTableState();
    },
    createRow: function (value) {
        return `<tr role='row'>
                <td> 
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="customCheck1" checked>
                        <label class="custom-control-label" for="customCheck1"></label>
                    </div>
                </td>
                <td class='d-block d-sm-none' role='cell'>${hennge.mails.createMobileCell(value)}</td>
                <td class='d-none d-sm-block' role='cell'>${value.from}</td>
                <td class='d-none d-sm-block' role='cell'><span>${hennge.mails.checkEmails(value.to)}</span></td>
                <td class='d-none d-sm-block' role='cell'>${value.subject + hennge.mails.checkIfAttachmmentIsAvailable(value.attachment, true)}</td>
                <td class='d-none d-sm-block ' role='cell'>${timeFromNow(value.datetime)}</td>
                </tr>
                 `
    },
    createMobileCell: function (value) {
        return `
        <i class='icon hennge icon-icon_mail_sp iker'></i> 
        <span>${value.from}</span> 
        <br> 
        <span>${hennge.mails.checkEmails(value.to)}<span class='iki'>${hennge.mails.checkIfAttachmmentIsAvailable(value.attachment, false)} ${timeFromNow(value.datetime)} </span></span>
        <br>
        <span>${value.subject}</span>
        `
    },
    setSearchByDate: function () {
        const input = document.getElementById('search-by-date');

        input.addEventListener('change', updateValue);

        function updateValue(e) {
            console.log(e.target.value)
            hennge.mails.$selectedDate = e.target.value;
        }
    },
    filterTableByDate: function (rangeDate) {
        const pastDates = hennge.mails.$data.filter(x => Date.parse(x.datetime) < new Date(rangeDate));
        const futureDates = hennge.mails.$data.filter(x => Date.parse(x.datetime) > new Date(rangeDate));
        console.log("Past dates", JSON.stringify(pastDates, null, 4));
        console.log("Future dates", JSON.stringify(futureDates, null, 4));
        hennge.mails.$data = futureDates;
        this.fillTableWithData();
    },
    resetTableDate: function () {
        $("#datatable tbody").empty();
        this.$data = [];
        this.fillTableWithData();
    },
    checkIfAttachmmentIsAvailable: function (attachment, position) {
        if (attachment) {
            return `<i class="icon hennge icon-icon_clip ${position ? 'right' : ''}"></i>`
        }
        return ''
    },
    checkEmails: function (emails) {
        var emails = emails.split(',')
        return emails[0] + hennge.mails.crateBadge(emails)
    },
    crateBadge: function (emails) {
        if (emails.length > 1) {
            return '<span>,... <span class="badge badge-secondary">+' + (emails.length - 1) + '</span></span>'
        } else {
            return ''
        }
    }
}
var isToday = function (someDate) {
    someDate = new Date(someDate)
    const today = new Date()
    return someDate.getDate() == today.getDate()
}
var isPresentYear = function (someDate) {
    someDate = new Date(someDate)
    const today = new Date()
    return someDate.getFullYear() == today.getFullYear()
}

var timeFromNow = function (time) {
    if (isToday(time)) {
        return new Date(time).getHours() + ':' + new Date(time).getMinutes();
    }
    if (isPresentYear(time)) {
        return new Date(time).toLocaleString('default', {
            month: 'short'
        }) + ' ' + new Date(time).getDay();
    }
    return new Date(time).toISOString().slice(0, 10)
};