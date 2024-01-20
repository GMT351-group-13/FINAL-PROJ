// Sidebar açma/kapatma işlevi
document.addEventListener('DOMContentLoaded', function() {
    var sidebarToggle = document.querySelector('.sidebar-toggle');
    var sidebar = document.getElementById('sidebar');
    var content = document.querySelector('.content');

    // Toggle butonuna tıklama olayını dinle
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        content.classList.toggle('active');
        sidebarToggle.classList.toggle('active');
    });
});
