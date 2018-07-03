 onClickGenerateReport() {
        let feedIds: Array<number> = this.GetFilteredFeedIds();
        let feedSummaryReport_index = 1;
        this.feedList = [];
        this.queryResultsData.forEach((x: any) => {
            if (x.selected)
                if (this.feedList.filter((f: any) => x.FEED_ID == f.FeedID).length == 0)
                    this.feedList.push({ FeedID: x.FEED_ID, DwFeedId: x.DW_FEED_ID });
        });
        if (feedIds.length > 0) {
            var myVar: any;
            myVar = setInterval(() => {
                this.alertMessage.displayMessage({ severity: Constants.severityInfo, summary: '', detail: "Please wait..." });
            }, 30000);
            this.createFeedService.GenerateReport(this.feedList, this.customizeReport.getSelectedParameters(), feedSummaryReport_index).subscribe(
                (data: any) => {
                    if (data != null) {
                        let DocumentName = 'DataExport.xlsx';
                        if (this.feedList.length == 1) {
                            DocumentName = this.queryResultsData.filter(f => f.selected && f.FEED_ID == this.feedList[0].FeedID)[0].FEED_NM + '.xlsx';
                        }

                        var byteCharacters = atob(data);
                        var byteNumbers = new Array(byteCharacters.length);
                        for (var i = 0; i < byteCharacters.length; i++) {
                            byteNumbers[i] = byteCharacters.charCodeAt(i);
                        }
                        var byteArray = new Uint8Array(byteNumbers);
                        var blob = new Blob([byteArray], { type: "" });
                        var ua = window.navigator.userAgent;
                        var msie = ua.indexOf("MSIE ");
                        var chrome = ua.indexOf("Chrome");

                        if (msie > -1 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                            window.navigator.msSaveOrOpenBlob(blob, DocumentName);
                        }
                        else {
                            var objectUrl = URL.createObjectURL(blob, DocumentName);
                            var link = document.createElement("A");
                            link.setAttribute("href", objectUrl);
                            link.setAttribute("download", DocumentName);
                            link.setAttribute("target", "_blank");
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }
                    }
                    clearInterval(myVar);
                },
                (err: any) => {
                    clearInterval(myVar);
                    this.alertMessage.displayMessage({ severity: Constants.severityError, summary: '', detail: "Server Issue - Could not Export" });
                });
        }
        else {
            this.alertMessage.displayMessage({ severity: Constants.severityWarn, summary: '', detail: "Please select atleast one feed" });
        }

    }
