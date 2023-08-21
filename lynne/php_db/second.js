$(document).ready(function () {
    // 從 connect.php 取得資料
    $.getJSON("connect.php", function (data) {
        // 生成 Result ID 下拉選單選項
        var select = $("#resultID_select");
        $.each(data, function (index, item) {
            select.append(
                $("<option></option>")
                    .attr("value", item.result_UE_BS_info_ID)
                    .text("Result ID " + item.result_UE_BS_info_ID)
            );
        });

        // 生成 CIO Table 函數
        function displayCIOTable(cioTableData) {
            var tableHtml = "<table>";
            for (var i = 0; i < cioTableData.length; i++) {
                tableHtml += "<tr>";
                for (var j = 0; j < cioTableData[i].length; j++) {
                    tableHtml += "<td>" + cioTableData[i][j] + "</td>";
                }
                tableHtml += "</tr>";
            }
            tableHtml += "</table>";

            // 放入對應的容器
            $("#cio_table-container").html(tableHtml);
        }

        // 監聽選擇事件
        $("#resultID_select").on("change", function () {
            var selectedResultID = parseInt($(this).val());
            var selectedData = data.find(
                (item) => item.result_UE_BS_info_ID === selectedResultID
            );

            // 取出 CIO table 資料
            var cioTableData = selectedData.CIO_Table;
            displayCIOTable(cioTableData);
        });

        // 初始化時觸發一次
        $("#resultID_select").trigger("change");
    });
});
