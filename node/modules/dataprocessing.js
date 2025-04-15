const csvData = `
Konto;Kontonavn;Dato;Bilag;Bilagstype;Tekst;Momstype;Beløb;Saldo
1000;Salg af varer/ydelser m/moms;05-01-2024;210236;Salgsfaktura;Tilgængeliggørelse af dokumenter;Dansk salgsmoms;-1.500,00;-1.500,00
1000;Salg af varer/ydelser m/moms;05-01-2024;210236;Salgsfaktura;Modpostering af: Tilgængeliggørelse af dokumenter;Dansk salgsmoms;1.500,00;0
1000;Salg af varer/ydelser m/moms;05-01-2024;210237;Salgsfaktura;Tilgængeliggørelse af dokumenter;Dansk salgsmoms;-1.500,00;-1.500,00
1000;Salg af varer/ydelser m/moms;10-01-2024;210238;Salgsfaktura;Webtilgængelighedstest;Dansk salgsmoms;-64.000,00;-65.500,00
1000;Salg af varer/ydelser m/moms;18-01-2024;210239;Salgsfaktura;Tilgængeliggørelse af dokumenter;Dansk salgsmoms;-1.400,00;-66.900,00
1000;Salg af varer/ydelser m/moms;31-01-2024;210240;Salgsfaktura;Dialogmøde - dybdegående monitoreringer;Dansk salgsmoms;-6.000,00;-72.900,00
1000;Salg af varer/ydelser m/moms;31-01-2024;210240;Salgsfaktura;Tjek af tilgængelighedserklæring - forenklede;Dansk salgsmoms;-13.685,00;-86.585,00
1000;Salg af varer/ydelser m/moms;31-01-2024;210240;Salgsfaktura;Forenklet monitorering for websted;Dansk salgsmoms;-61.500,00;-148.085,00
1000;Salg af varer/ydelser m/moms;31-01-2024;210240;Salgsfaktura;Monitoreringsrapport;Dansk salgsmoms;-195.500,00;-343.585,00
1000;Salg af varer/ydelser m/moms;31-01-2024;210241;Salgsfaktura;Konsulent - x, Inqlude IT;Dansk salgsmoms;-1.050,00;-344.635,00
1000;Salg af varer/ydelser m/moms;31-01-2024;210241;Salgsfaktura;Projektledelse - x, Inqlude IT;Dansk salgsmoms;-11.000,00;-355.635,00
1000;Salg af varer/ydelser m/moms;31-01-2024;210241;Salgsfaktura;Projektledelse - x;Dansk salgsmoms;-6.000,00;-361.635,00
1000;Salg af varer/ydelser m/moms;31-01-2024;210241;Salgsfaktura;Projektledelse - x;Dansk salgsmoms;-5.000,00;-366.635,00
1000;Salg af varer/ydelser m/moms;31-01-2024;210241;Salgsfaktura;Seniorkonsulent - x;Dansk salgsmoms;-20.900,00;-387.535,00
1000;Salg af varer/ydelser m/moms;31-01-2024;210241;Salgsfaktura;Seniorkonsulent - x, Inqlude IT;Dansk salgsmoms;-3.300,00;-390.835,00
1000;Salg af varer/ydelser m/moms;31-01-2024;210241;Salgsfaktura;Konsulent - x;Dansk salgsmoms;-3.500,00;-394.335,00
1000;Salg af varer/ydelser m/moms;01-02-2024;210242;Salgsfaktura;Tilgængeliggørelse af dokumenter;Dansk salgsmoms;-4.200,00;-398.535,00
1000;Salg af varer/ydelser m/moms;07-02-2024;210243;Salgsfaktura;Tilgængeliggørelse af dokumenter;Dansk salgsmoms;-10.150,00;-408.685,00
1000;Salg af varer/ydelser m/moms;11-02-2024;210244;Salgsfaktura;Tilgængeliggørelse;Dansk salgsmoms;-6.750,00;-415.435,00
1000;Salg af varer/ydelser m/moms;26-02-2024;210245;Salgsfaktura;Tilgængelighedstest;Dansk salgsmoms;-25.000,00;-440.435,00
1000;Salg af varer/ydelser m/moms;28-02-2024;210246;Salgsfaktura;Dybdegående monitorering for websted;Dansk salgsmoms;-144.000,00;-584.435,00
1000;Salg af varer/ydelser m/moms;28-02-2024;210246;Salgsfaktura;Forenklet monitorering for websted;Dansk salgsmoms;-69.500,00;-653.935,00
1000;Salg af varer/ydelser m/moms;28-02-2024;210246;Salgsfaktura;Tjek af tilgængelighedserklæring - dybdegående;Dansk salgsmoms;-5.100,00;-659.035,00
1000;Salg af varer/ydelser m/moms;28-02-2024;210246;Salgsfaktura;Monitoreringsrapport;Dansk salgsmoms;-5.100,00;-664.135,00
1000;Salg af varer/ydelser m/moms;28-02-2024;210246;Salgsfaktura;Dialogmøde - dybdegående monitoreringer;Dansk salgsmoms;-15.000,00;-679.135,00
1000;Salg af varer/ydelser m/moms;28-02-2024;210247;Salgsfaktura;Projektledelse - x, Inqlude IT;Dansk salgsmoms;-6.000,00;-685.135,00
1000;Salg af varer/ydelser m/moms;28-02-2024;210247;Salgsfaktura;Projektledelse - x;Dansk salgsmoms;-6.000,00;-691.135,00
1000;Salg af varer/ydelser m/moms;28-02-2024;210247;Salgsfaktura;Projektledelse - x;Dansk salgsmoms;-14.000,00;-705.135,00
1000;Salg af varer/ydelser m/moms;28-02-2024;210247;Salgsfaktura;Seniorkonsulent - x, Inqlude IT;Dansk salgsmoms;-12.100,00;-717.235,00
1000;Salg af varer/ydelser m/moms;28-02-2024;210247;Salgsfaktura;Konsulent - x;Dansk salgsmoms;-5.600,00;-722.835,00
1000;Salg af varer/ydelser m/moms;28-02-2024;210247;Salgsfaktura;Konsulent - x, Inqlude IT;Dansk salgsmoms;-2.100,00;-724.935,00
1000;Salg af varer/ydelser m/moms;27-03-2024;210248;Salgsfaktura;Projektledelse - x, Inqlude IT;Dansk salgsmoms;-7.000,00;-731.935,00
1000;Salg af varer/ydelser m/moms;27-03-2024;210248;Salgsfaktura;Projektledelse - x;Dansk salgsmoms;-9.000,00;-740.935,00
1000;Salg af varer/ydelser m/moms;27-03-2024;210248;Salgsfaktura;Projektledelse - x;Dansk salgsmoms;-7.000,00;-747.935,00
1000;Salg af varer/ydelser m/moms;27-03-2024;210248;Salgsfaktura;Seniorkonsulent - x, Inqlude IT;Dansk salgsmoms;-11.000,00;-758.935,00
1000;Salg af varer/ydelser m/moms;27-03-2024;210248;Salgsfaktura;Konsulent - x;Dansk salgsmoms;-700;-759.635,00
1000;Salg af varer/ydelser m/moms;27-03-2024;210249;Salgsfaktura;Tjek af tilgængelighedserklæring - forenklede;Dansk salgsmoms;-14.637,00;-774.272,00
1000;Salg af varer/ydelser m/moms;27-03-2024;210249;Salgsfaktura;Tjek af tilgængelighedserklæring - dybdegående;Dansk salgsmoms;-11.900,00;-786.172,00
1000;Salg af varer/ydelser m/moms;27-03-2024;210249;Salgsfaktura;Dybdegående monitorering for websted;Dansk salgsmoms;-336.000,00;-1.122.172,00
1000;Salg af varer/ydelser m/moms;27-03-2024;210249;Salgsfaktura;Monitoreringsrapport;Dansk salgsmoms;-221.000,00;-1.343.172,00
1000;Salg af varer/ydelser m/moms;27-03-2024;210249;Salgsfaktura;Dialogmøde - dybdegående monitoreringer;Dansk salgsmoms;-12.000,00;-1.355.172,00
1000;Salg af varer/ydelser m/moms;04-04-2024;210250;Salgsfaktura;Tilgængeligørelse af T&F kontrakt;Dansk salgsmoms;-1.300,00;-1.356.472,00
1000;Salg af varer/ydelser m/moms;09-04-2024;210251;Salgsfaktura;Webtilgængelighedstest;Dansk salgsmoms;-32.400,00;-1.388.872,00
1000;Salg af varer/ydelser m/moms;09-04-2024;210252;Salgsfaktura;Webtilgængelighedstest;Dansk salgsmoms;-21.000,00;-1.409.872,00
1000;Salg af varer/ydelser m/moms;09-04-2024;210252;Salgsfaktura;Modpostering af: Webtilgængelighedstest;Dansk salgsmoms;21.000,00;-1.388.872,00
1000;Salg af varer/ydelser m/moms;09-04-2024;210253;Salgsfaktura;Tilgængelighedstest;Dansk salgsmoms;-21.000,00;-1.409.872,00
1000;Salg af varer/ydelser m/moms;11-04-2024;210254;Salgsfaktura;Webtilgængelighedstest;Dansk salgsmoms;-5.000,00;-1.414.872,00
1000;Salg af varer/ydelser m/moms;22-04-2024;210255;Salgsfaktura;Tilgængeliggørelse af kontrakter ;Dansk salgsmoms;-15.600,00;-1.430.472,00
1000;Salg af varer/ydelser m/moms;22-04-2024;210255;Salgsfaktura;Tilgængeliggørelse af 4 dokumenter;Dansk salgsmoms;-2.000,00;-1.432.472,00
1000;Salg af varer/ydelser m/moms;26-04-2024;210256;Salgsfaktura;Tilgængeliggørelse af årsrapport;Dansk salgsmoms;-3.750,00;-1.436.222,00
1000;Salg af varer/ydelser m/moms;29-04-2024;210257;Salgsfaktura;Tilgængeliggørelse af tillidspublikation;Dansk salgsmoms;-5.505,00;-1.441.727,00
1000;Salg af varer/ydelser m/moms;01-05-2024;210258;Salgsfaktura;Forenklet monitorering for websted;Dansk salgsmoms;-2.000,00;-1.443.727,00
1000;Salg af varer/ydelser m/moms;01-05-2024;210258;Salgsfaktura;Tjek af tilgængelighedserklæring - forenklede;Dansk salgsmoms;-1.190,00;-1.444.917,00
1000;Salg af varer/ydelser m/moms;01-05-2024;210258;Salgsfaktura;Tjek af tilgængelighedserklæring - dybdegående;Dansk salgsmoms;-6.800,00;-1.451.717,00
1000;Salg af varer/ydelser m/moms;01-05-2024;210258;Salgsfaktura;Dybdegående monitorering for websted;Dansk salgsmoms;-192.000,00;-1.643.717,00
1000;Salg af varer/ydelser m/moms;01-05-2024;210258;Salgsfaktura;Monitoreringsrapport;Dansk salgsmoms;-23.800,00;-1.667.517,00
1000;Salg af varer/ydelser m/moms;01-05-2024;210258;Salgsfaktura;Dialogmøde - dybdegående monitoreringer;Dansk salgsmoms;-6.000,00;-1.673.517,00
1000;Salg af varer/ydelser m/moms;01-05-2024;210259;Salgsfaktura;Konsulent - x, Inqlude IT;Dansk salgsmoms;-1.400,00;-1.674.917,00
1000;Salg af varer/ydelser m/moms;01-05-2024;210259;Salgsfaktura;Projektledelse - x, Inqlude IT;Dansk salgsmoms;-6.000,00;-1.680.917,00
1000;Salg af varer/ydelser m/moms;01-05-2024;210259;Salgsfaktura;Projektledelse - x;Dansk salgsmoms;-14.000,00;-1.694.917,00
1000;Salg af varer/ydelser m/moms;01-05-2024;210259;Salgsfaktura;Projektledelse - x;Dansk salgsmoms;-18.000,00;-1.712.917,00
1000;Salg af varer/ydelser m/moms;01-05-2024;210259;Salgsfaktura;Seniorkonsulent - x, Inqlude IT;Dansk salgsmoms;-2.200,00;-1.715.117,00
1000;Salg af varer/ydelser m/moms;06-05-2024;210260;Salgsfaktura;Webtilgængelighedstest;Dansk salgsmoms;-8.400,00;-1.723.517,00
1000;Salg af varer/ydelser m/moms;06-05-2024;210260;Salgsfaktura;Modpostering af: Webtilgængelighedstest;Dansk salgsmoms;8.400,00;-1.715.117,00
1000;Salg af varer/ydelser m/moms;07-05-2024;210261;Salgsfaktura;Tilgængeliggørelse af dokument;Dansk salgsmoms;-1.000,00;-1.716.117,00
1000;Salg af varer/ydelser m/moms;07-05-2024;210262;Salgsfaktura;Tilgængelighedstest;Dansk salgsmoms;-8.000,00;-1.724.117,00
1000;Salg af varer/ydelser m/moms;07-05-2024;210263;Salgsfaktura;Webtilgængelighedstest;Dansk salgsmoms;-8.400,00;-1.732.517,00
1000;Salg af varer/ydelser m/moms;06-06-2024;210264;Salgsfaktura;Tjek af tilgængelighedserklæring - dybdegående;Dansk salgsmoms;-5.100,00;-1.737.617,00
1000;Salg af varer/ydelser m/moms;06-06-2024;210264;Salgsfaktura;Dybdegående monitorering for websted;Dansk salgsmoms;-144.000,00;-1.881.617,00
1000;Salg af varer/ydelser m/moms;06-06-2024;210264;Salgsfaktura;Monitoreringsrapport;Dansk salgsmoms;-5.100,00;-1.886.717,00
1000;Salg af varer/ydelser m/moms;06-06-2024;210265;Salgsfaktura;Konsulent - x;Dansk salgsmoms;-1.400,00;-1.888.117,00
1000;Salg af varer/ydelser m/moms;06-06-2024;210265;Salgsfaktura;Projektledelse - x, Inqlude IT;Dansk salgsmoms;-10.000,00;-1.898.117,00
1000;Salg af varer/ydelser m/moms;06-06-2024;210265;Salgsfaktura;Projektledelse - x;Dansk salgsmoms;-16.000,00;-1.914.117,00
1000;Salg af varer/ydelser m/moms;06-06-2024;210265;Salgsfaktura;Projektledelse - x;Dansk salgsmoms;-22.000,00;-1.936.117,00
1000;Salg af varer/ydelser m/moms;06-06-2024;210265;Salgsfaktura;Seniorkonsulent - x;Dansk salgsmoms;-5.500,00;-1.941.617,00
1000;Salg af varer/ydelser m/moms;06-06-2024;210265;Salgsfaktura;Seniorkonsulent - x;Dansk salgsmoms;-26.400,00;-1.968.017,00
1000;Salg af varer/ydelser m/moms;06-06-2024;210265;Salgsfaktura;Seniorkonsulent - x, Inqlude IT;Dansk salgsmoms;-77.000,00;-2.045.017,00
1000;Salg af varer/ydelser m/moms;06-06-2024;210265;Salgsfaktura;Konsulent - x, Inqlude IT;Dansk salgsmoms;-3.500,00;-2.048.517,00
1000;Salg af varer/ydelser m/moms;07-06-2024;210266;Salgsfaktura;Design review ;Dansk salgsmoms;-25.200,00;-2.073.717,00
1000;Salg af varer/ydelser m/moms;24-06-2024;210267;Salgsfaktura;Tilgængeliggørelse af inspirationskatalog;Dansk salgsmoms;-3.850,00;-2.077.567,00
1000;Salg af varer/ydelser m/moms;24-06-2024;210268;Salgsfaktura;Webtilgængelighed 3K: Kursus i tilgængelige Word dokumenter;Dansk salgsmoms;-13.000,00;-2.090.567,00
1000;Salg af varer/ydelser m/moms;28-06-2024;210269;Salgsfaktura;Webtilgængelighedstest;Dansk salgsmoms;-50.800,00;-2.141.367,00
1000;Salg af varer/ydelser m/moms;28-06-2024;210270;Salgsfaktura;Dialogmøde - dybdegående monitoreringer;Dansk salgsmoms;-12.000,00;-2.153.367,00
1000;Salg af varer/ydelser m/moms;28-06-2024;210270;Salgsfaktura;Tjek af tilgængelighedserklæring - dybdegående;Dansk salgsmoms;-11.900,00;-2.165.267,00
1000;Salg af varer/ydelser m/moms;28-06-2024;210270;Salgsfaktura;Dybdegående monitorering for websted;Dansk salgsmoms;-240.000,00;-2.405.267,00
1000;Salg af varer/ydelser m/moms;28-06-2024;210270;Salgsfaktura;Dybdegående monitorering af mobilapplikation;Dansk salgsmoms;-45.000,00;-2.450.267,00
1000;Salg af varer/ydelser m/moms;28-06-2024;210270;Salgsfaktura;Monitoreringsrapport;Dansk salgsmoms;-11.900,00;-2.462.167,00
1000;Salg af varer/ydelser m/moms;28-06-2024;210271;Salgsfaktura;Projektledelse - x, Inqlude IT;Dansk salgsmoms;-20.000,00;-2.482.167,00
1000;Salg af varer/ydelser m/moms;28-06-2024;210271;Salgsfaktura;Projektledelse - x;Dansk salgsmoms;-4.000,00;-2.486.167,00
1000;Salg af varer/ydelser m/moms;28-06-2024;210271;Salgsfaktura;Projektledelse - x;Dansk salgsmoms;-6.000,00;-2.492.167,00
1000;Salg af varer/ydelser m/moms;28-06-2024;210271;Salgsfaktura;Seniorkonsulent - x, Inqlude IT;Dansk salgsmoms;-12.100,00;-2.504.267,00
1000;Salg af varer/ydelser m/moms;28-06-2024;210271;Salgsfaktura;Konsulent - x, Inqlude IT;Dansk salgsmoms;-16.800,00;-2.521.067,00
1000;Salg af varer/ydelser m/moms;31-07-2024;210272;Salgsfaktura;Tjek af tilgængelighedserklæring - dybdegående;Dansk salgsmoms;-5.100,00;-2.526.167,00
1000;Salg af varer/ydelser m/moms;31-07-2024;210272;Salgsfaktura;Dybdegående monitorering af mobilapplikation;Dansk salgsmoms;-67.500,00;-2.593.667,00
1000;Salg af varer/ydelser m/moms;31-07-2024;210272;Salgsfaktura;Monitoreringsrapport;Dansk salgsmoms;-5.100,00;-2.598.767,00
1000;Salg af varer/ydelser m/moms;26-08-2024;210273;Salgsfaktura;Design review;Dansk salgsmoms;-17.750,00;-2.616.517,00
1000;Salg af varer/ydelser m/moms;29-08-2024;210274;Salgsfaktura;Dialogmøde - dybdegående monitoreringer;Dansk salgsmoms;-6.000,00;-2.622.517,00
1000;Salg af varer/ydelser m/moms;29-08-2024;210274;Salgsfaktura;Tjek af tilgængelighedserklæring - dybdegående;Dansk salgsmoms;-3.400,00;-2.625.917,00
1000;Salg af varer/ydelser m/moms;29-08-2024;210274;Salgsfaktura;Dybdegående monitorering for websted;Dansk salgsmoms;-48.000,00;-2.673.917,00
1000;Salg af varer/ydelser m/moms;29-08-2024;210274;Salgsfaktura;Dybdegående monitorering af mobilapplikation;Dansk salgsmoms;-22.500,00;-2.696.417,00
1000;Salg af varer/ydelser m/moms;29-08-2024;210274;Salgsfaktura;Monitoreringsrapport;Dansk salgsmoms;-3.400,00;-2.699.817,00
1000;Salg af varer/ydelser m/moms;29-08-2024;210275;Salgsfaktura;Projektledelse - x, Inqlude IT;Dansk salgsmoms;-3.000,00;-2.702.817,00
1000;Salg af varer/ydelser m/moms;29-08-2024;210275;Salgsfaktura;Projektledelse - x;Dansk salgsmoms;-4.000,00;-2.706.817,00
1000;Salg af varer/ydelser m/moms;29-08-2024;210275;Salgsfaktura;Projektledelse - x;Dansk salgsmoms;-1.000,00;-2.707.817,00
1000;Salg af varer/ydelser m/moms;04-09-2024;210276;Salgsfaktura;Webtilgængelighedstest;Dansk salgsmoms;-25.000,00;-2.732.817,00
1000;Salg af varer/ydelser m/moms;05-09-2024;210277;Salgsfaktura;Tilgængelighedstest af app;Dansk salgsmoms;-11.250,00;-2.744.067,00
1000;Salg af varer/ydelser m/moms;09-09-2024;210278;Salgsfaktura;Tilgængelliggørelse;Dansk salgsmoms;-1.800,00;-2.745.867,00
1000;Salg af varer/ydelser m/moms;13-09-2024;210279;Salgsfaktura;Workshop;Dansk salgsmoms;-22.285,00;-2.768.152,00
1000;Salg af varer/ydelser m/moms;13-09-2024;210279;Salgsfaktura;Overnatning;Dansk salgsmoms;-1.196,00;-2.769.348,00
1000;Salg af varer/ydelser m/moms;25-09-2024;210280;Salgsfaktura;Webtilgængelighedstest;Dansk salgsmoms;-46.500,00;-2.815.848,00
1000;Salg af varer/ydelser m/moms;25-09-2024;210281;Salgsfaktura;Tilgængeliggørelse af dokument;Dansk salgsmoms;-4.225,00;-2.820.073,00
1000;Salg af varer/ydelser m/moms;25-09-2024;210282;Salgsfaktura;Tilgængelighedstest;Dansk salgsmoms;-61.605,00;-2.881.678,00
1000;Salg af varer/ydelser m/moms;30-09-2024;210283;Salgsfaktura;Tilgængelighedstest;Dansk salgsmoms;-29.750,00;-2.911.428,00
1000;Salg af varer/ydelser m/moms;30-09-2024;210284;Salgsfaktura;Dialogmøde - dybdegående monitoreringer;Dansk salgsmoms;-12.000,00;-2.923.428,00
1000;Salg af varer/ydelser m/moms;30-09-2024;210285;Salgsfaktura;Seniorkonsulent - x, Inqlude IT;Dansk salgsmoms;-69.850,00;-2.993.278,00
1000;Salg af varer/ydelser m/moms;30-09-2024;210285;Salgsfaktura;Projektledelse - x;Dansk salgsmoms;-2.000,00;-2.995.278,00
1000;Salg af varer/ydelser m/moms;30-09-2024;210285;Salgsfaktura;Seniorkonsulent - x;Dansk salgsmoms;-30.800,00;-3.026.078,00
1000;Salg af varer/ydelser m/moms;30-10-2024;210286;Salgsfaktura;Webtilgængelighedstest;Dansk salgsmoms;-22.500,00;-3.048.578,00
1000;Salg af varer/ydelser m/moms;30-10-2024;210287;Salgsfaktura;Webtilgængelighedstest;Dansk salgsmoms;-12.700,00;-3.061.278,00
1000;Salg af varer/ydelser m/moms;30-10-2024;210288;Salgsfaktura;Eksperttest af desktop;Dansk salgsmoms;-40.250,00;-3.101.528,00
1000;Salg af varer/ydelser m/moms;30-10-2024;210288;Salgsfaktura;Brugertest;Dansk salgsmoms;-48.400,00;-3.149.928,00
1000;Salg af varer/ydelser m/moms;30-10-2024;210288;Salgsfaktura;Eksperttest af mobilapplikation;Dansk salgsmoms;-30.500,00;-3.180.428,00
1000;Salg af varer/ydelser m/moms;30-10-2024;210289;Salgsfaktura;Dialogmøde - dybdegående monitoreringer;Dansk salgsmoms;-6.000,00;-3.186.428,00
1000;Salg af varer/ydelser m/moms;31-10-2024;210290;Salgskreditnota;Webtilgængelighedstest;Dansk salgsmoms;22.500,00;-3.163.928,00
1000;Salg af varer/ydelser m/moms;31-10-2024;210291;Salgsfaktura;Webtilgængelighedstest;Dansk salgsmoms;-22.500,00;-3.186.428,00
1000;Salg af varer/ydelser m/moms;27-11-2024;210292;Salgsfaktura;Tilgængelighedstest;Dansk salgsmoms;-33.066,00;-3.219.494,00
1000;Salg af varer/ydelser m/moms;27-11-2024;210293;Salgsfaktura;Tilgængelighedstest;Dansk salgsmoms;-30.173,00;-3.249.667,00
1000;Salg af varer/ydelser m/moms;28-11-2024;210294;Salgsfaktura;Tilgængeliggørelse og rådgivning;Dansk salgsmoms;-5.250,00;-3.254.917,00
1000;Salg af varer/ydelser m/moms;28-11-2024;210295;Salgsfaktura;Tilgængeliggørelse af dokument;Dansk salgsmoms;-3.600,00;-3.258.517,00
1000;Salg af varer/ydelser m/moms;03-12-2024;210296;Salgsfaktura;Design review;Dansk salgsmoms;-8.600,00;-3.267.117,00
1000;Salg af varer/ydelser m/moms;05-12-2024;210297;Salgskreditnota;Tilgængelighedstest;Dansk salgsmoms;30.173,00;-3.236.944,00
1000;Salg af varer/ydelser m/moms;05-12-2024;210298;Salgsfaktura;Tilgængelighedstest;Dansk salgsmoms;-28.941,00;-3.265.885,00
1000;Salg af varer/ydelser m/moms;09-12-2024;210299;Salgsfaktura;Tilgængelighedstest;Dansk salgsmoms;-95.000,00;-3.360.885,00
1000;Salg af varer/ydelser m/moms;09-12-2024;210300;Salgsfaktura;Tilgængelighedstest;Dansk salgsmoms;-42.500,00;-3.403.385,00
1000;Salg af varer/ydelser m/moms;12-12-2024;210301;Salgsfaktura;Tilgængelighedstest;Dansk salgsmoms;-32.500,00;-3.435.885,00
1000;Salg af varer/ydelser m/moms;13-12-2024;210302;Salgsfaktura;Webtilgængelighedstest;Dansk salgsmoms;-38.250,00;-3.474.135,00
1000;Salg af varer/ydelser m/moms;13-12-2024;210303;Salgsfaktura;Gennemgang af Monsido issues;Dansk salgsmoms;-13.500,00;-3.487.635,00
1000;Salg af varer/ydelser m/moms;13-12-2024;210303;Salgsfaktura;Årlig monitorering;Dansk salgsmoms;-30.000,00;-3.517.635,00
1000;Salg af varer/ydelser m/moms;13-12-2024;210304;Salgsfaktura;Tilgængelighedstest;Dansk salgsmoms;-46.500,00;-3.564.135,00
1000;Salg af varer/ydelser m/moms;16-12-2024;210305;Salgskreditnota;Gennemgang af Monsido issues;Dansk salgsmoms;13.500,00;-3.550.635,00
1000;Salg af varer/ydelser m/moms;16-12-2024;210305;Salgskreditnota;Årlig monitorering;Dansk salgsmoms;30.000,00;-3.520.635,00
1000;Salg af varer/ydelser m/moms;16-12-2024;210306;Salgsfaktura;Gennemgang af Monsido issues;Dansk salgsmoms;-13.500,00;-3.534.135,00
1000;Salg af varer/ydelser m/moms;16-12-2024;210306;Salgsfaktura;Årlig monitorering;Dansk salgsmoms;-30.000,00;-3.564.135,00
1000;Salg af varer/ydelser m/moms;17-12-2024;210307;Salgsfaktura;Årlig monitorering;Dansk salgsmoms;-30.000,00;-3.594.135,00
1000;Salg af varer/ydelser m/moms;18-12-2024;210308;Salgsfaktura;Online kursus;Dansk salgsmoms;-6.500,00;-3.600.635,00
1000;Salg af varer/ydelser m/moms;19-12-2024;210309;Salgsfaktura;Tilgængelighedstest;Dansk salgsmoms;-32.500,00;-3.633.135,00
1000;Salg af varer/ydelser m/moms;20-12-2024;210310;Salgsfaktura;Minikursus;Dansk salgsmoms;-1.750,00;-3.634.885,00
`;

//make a function that can take a CSV file and convert it to plain text
function csvToPlainText(file) {
  
    if(!file||!FileReader) {
    console.error('File or FileReader not supported');
    return;
  }
  
    let text = new FileReader();
    text.onload = function(e) {
    }
    text.readAsText(file);

    return text.result;
}
  
// -------------------- CSV to JSON -------------------------
// takes a CSV as text and retunss a JSON object of each line
//-----------------------------------------------------------
function csvToJSON(csv, delimiter = ';') {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(delimiter).map(h => h.trim());

  return lines.slice(1).map(line => {
    const values = line.split(delimiter).map(v => v.trim());
    return Object.fromEntries(headers.map((header, i) => [header, values[i]]));
  });
}

// --------------- Transform CSV JSON into desired structure ---------------
function transformDataToAccountStructure(data) {
  return data.reduce((acc, item) => {
    const { Konto, Kontonavn, Dato, 'Beløb': beløb } = item;
    const [day, month, year] = Dato.split('-'); // Split the Dato (DD-MM-YYYY) format
    const monthName = new Date(`${year}-${month}-${day}`).toLocaleString('default', { month: 'long' }).toLowerCase(); // Convert month to long format (e.g., january)
    
    // Remove thousands separator (.) and convert ',' to '.' for decimal point
    const amount = parseFloat(beløb.replace('.', '').replace(',', '.'));
    
    // Initialize account if not already present
    if (!acc[Konto]) {
      acc[Konto] = {
        kontonavn: Kontonavn,
        årstal: [year],
        perMåned: {}
      };
    }

    // Add year if it's not already in the list
    if (!acc[Konto].årstal.includes(year)) {
      acc[Konto].årstal.push(year);
    }

    // Initialize the month if it's not already present for the given account
    if (!acc[Konto].perMåned[monthName]) {
      acc[Konto].perMåned[monthName] = [];
    }

    // Add Beløb to the appropriate month
    acc[Konto].perMåned[monthName].push(amount);

    return acc;
  }, {});
}

//Makes a 12 long array of the sums of each mounth for each account
function mounthlySumsArrays (data) {
    const result = {};
    
    for (const konto in data) {
        const { kontonavn, perMåned } = data[konto];
        const MånedSum = new Array(12).fill(0);
    
        for (const month in perMåned) {
            const monthIndex = new Date(Date.parse(month + " 1, 2021")).getMonth(); // Convert month name to index
            MånedSum[monthIndex] = perMåned[month].reduce((acc, val) => acc + val, 0);
        }
    
        result[konto] = { kontonavn, MånedSum };
    }
    
    return result;
}


function readcsvPrMonth(csv) {
    const csvText = csvToPlainText(csv);
    const data = csvToJSON(csvText);
    const transformedData = transformDataToAccountStructure(data);
    const monthlyData = mounthlySumsArrays(transformedData);
    return monthlyData;
}

/*
{
    "1000": {
      "kontonavn": "Salg af varer/ydelser m/moms",
      "MånedSum": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    "2000": {
      "kontonavn": "Salg af varer/ydelser m/moms",
      "MånedSum": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  }...
*/
