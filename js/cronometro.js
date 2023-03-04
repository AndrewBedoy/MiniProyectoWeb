function iniciarCronometro() {
    m = 0;
    s = 0;
    mls = 0;
    cronometroStarted = 0;
    cronometro = document.getElementById("cronometro");
    write();
    start();
};

function write() {
    let mt, st, mlst;
    mls++;

    if (mls > 99) {
        s++;
        mls = 0;
    }
    if (s > 59) {
        m++;
        s = 0;
    }

    mlst = ('0' + mls).slice(-2);
    st = ('0' + s).slice(-2);
    mt = ('0' + m).slice(-2);
    cronometro.innerHTML = `${mt}:${st}.${mlst}`;
}

function start() {
    write();
    cronometroStarted = setInterval(write, 10);
}

function detenercronometro() {
    clearInterval(cronometroStarted);
}

function total() {
    tpo = cronometro.innerHTML;
    //document.write($tiempo);
    clearInterval(cronometroStarted);
    //window.location.href = window.location.href + "?tpo=" + tpo;
    return tpo;
    //return $tiempo;
}

function reset() {
    clearInterval(cronometroStarted);
    cronometro.innerHTML = "00:00.00"
    m = 0;
    s = 0;
    mls = 0;
}
