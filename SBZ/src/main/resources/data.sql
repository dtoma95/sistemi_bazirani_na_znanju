insert into korisnik(id, username, ime, prezime, lozinka, uloga) values (1, 'admin', 'Admin', 'Admin', 'admin', 0)
insert into korisnik(id, username, ime, prezime, lozinka, uloga) values (2, 'lekar', 'Dr', 'Dre', 'lekar', 1)

insert into pacijent(id, ime, prezime) values (1, 'Mali', 'moler')

insert into sastojak(id, naziv) values (1, 'Kikiriki')

insert into lek(id, naziv, ltype) values (1, 'Antibiotik', 0)
insert into lek(id, naziv, ltype) values (2, 'Analgetik', 1)
insert into lek(id, naziv, ltype) values (3, 'Neki lek', 2)

insert into lek_sastojci(lek_id, sastojci_id) values (3, 1)
insert into pacijent_alergije_lek(pacijent_id, alergije_lek_id) values (1, 1)
insert into pacijent_alergije_sastojci(pacijent_id, alergije_sastojci_id) values (1, 1)


--GRUPA 1 -----
---- PREHLADA----
insert into bolest(id, opis, btype) values (1, 'Prehlada', 0)
insert into simptom(id, naziv, svalue, stype) values (1, 'Curenje iz nosa', 0, 0)
insert into simptom(id, naziv, svalue, stype) values (2, 'Bol u grlu', 0, 0)
insert into simptom(id, naziv, svalue, stype) values (3, 'Glavobolja', 0, 0)
insert into simptom(id, naziv, svalue, stype) values (4, 'Kijanje', 0, 0)
insert into simptom(id, naziv, svalue, stype) values (5, 'Kasalj', 0, 0)

insert into bolest_simptomi(bolest_id, simptomi_id) values (1, 1)
insert into bolest_simptomi(bolest_id, simptomi_id) values (1, 2)
insert into bolest_simptomi(bolest_id, simptomi_id) values (1, 3)
insert into bolest_simptomi(bolest_id, simptomi_id) values (1, 4)
insert into bolest_simptomi(bolest_id, simptomi_id) values (1, 5)

---GROZNICA----
insert into bolest(id, opis, btype) values (2, 'Groznica', 0)
insert into simptom(id, naziv, svalue, stype) values (6, 'Temperatura veca od 38 C', 0, 1)
insert into simptom(id, naziv, svalue, stype) values (7, 'Drhtavica', 0, 0)


insert into bolest_simptomi(bolest_id, simptomi_id) values (2, 1)
insert into bolest_simptomi(bolest_id, simptomi_id) values (2, 2)
insert into bolest_simptomi(bolest_id, simptomi_id) values (2, 3)
insert into bolest_simptomi(bolest_id, simptomi_id) values (2, 4)
insert into bolest_simptomi(bolest_id, simptomi_id) values (2, 5)
insert into bolest_simptomi(bolest_id, simptomi_id) values (2, 6)
insert into bolest_simptomi(bolest_id, simptomi_id) values (2, 7)

---UPALA KRAJNIKA----
insert into bolest(id, opis, btype) values (3, 'Upala krajnika', 0)
insert into simptom(id, naziv, svalue, stype) values (8, 'Temperatura od 40 C do 41 C', 0, 1)
insert into simptom(id, naziv, svalue, stype) values (9, 'Bol koji se siri od usiju', 0, 0)
insert into simptom(id, naziv, svalue, stype) values (10, 'Zuti sekret iz nosa', 0, 0)
insert into simptom(id, naziv, svalue, stype) values (11, 'Umor', 0, 0)
insert into simptom(id, naziv, svalue, stype) values (12, 'Gubitak apetita', 0, 0)

insert into bolest_simptomi(bolest_id, simptomi_id) values (3, 8)
insert into bolest_simptomi(bolest_id, simptomi_id) values (3, 9)
insert into bolest_simptomi(bolest_id, simptomi_id) values (3, 10)
insert into bolest_simptomi(bolest_id, simptomi_id) values (3, 11)
insert into bolest_simptomi(bolest_id, simptomi_id) values (3, 12)
insert into bolest_simptomi(bolest_id, simptomi_id) values (3, 2)
insert into bolest_simptomi(bolest_id, simptomi_id) values (3, 3)
insert into bolest_simptomi(bolest_id, simptomi_id) values (3, 7)


---SINUSNA INFEKCIJA----
insert into bolest(id, opis, btype) values (4, 'Sinusna infekcija', 0)
insert into simptom(id, naziv, svalue, stype) values (13, 'Oticanje oko ociju', 0, 0)
insert into simptom(id, naziv, svalue, stype) values (14, 'Bolovao od prehlade ili groznice u poslednjih 60 dana', 0, 2)


insert into bolest_simptomi(bolest_id, simptomi_id) values (4, 13)
insert into bolest_simptomi(bolest_id, simptomi_id) values (4, 14)
insert into bolest_simptomi(bolest_id, simptomi_id) values (4, 2)
insert into bolest_simptomi(bolest_id, simptomi_id) values (4, 3)
insert into bolest_simptomi(bolest_id, simptomi_id) values (4, 5)
insert into bolest_simptomi(bolest_id, simptomi_id) values (4, 6)
insert into bolest_simptomi(bolest_id, simptomi_id) values (4, 10)

--GRUPA 2 -----
---HIPERTENZIJA-------
insert into bolest(id, opis, btype) values (5, 'Hipertenzija', 1)
insert into simptom(id, naziv, svalue, stype) values (15, 'Visok pritisak', 0, 0)


---DIJABETIS-------
insert into bolest(id, opis, btype) values (6, 'Dijabetis', 1)
insert into simptom(id, naziv, svalue, stype) values (16, 'Cesto Uriniranje', 0, 0)
insert into simptom(id, naziv, svalue, stype) values (17, 'Gubitak telesne tezine', 0, 0)
insert into simptom(id, naziv, svalue, stype) values (18, 'Zamor', 0, 0)
insert into simptom(id, naziv, svalue, stype) values (19, 'Mucnina', 0, 0)

insert into bolest_simptomi(bolest_id, simptomi_id) values (6, 16)
insert into bolest_simptomi(bolest_id, simptomi_id) values (6, 17)
insert into bolest_simptomi(bolest_id, simptomi_id) values (6, 18)
insert into bolest_simptomi(bolest_id, simptomi_id) values (6, 19)

--GRUPA 3 -----
---Hronicna bubrezna bolest-------
insert into bolest(id, opis, btype) values (7, 'Hronicna bubrezna bolest', 2)
insert into simptom(id, naziv, svalue, stype) values (20, 'Nocturia', 0, 0)
insert into simptom(id, naziv, svalue, stype) values (21, 'Gusenje', 0, 0)
insert into simptom(id, naziv, svalue, stype) values (22, 'Otoci nogu i zglobova', 0, 0)
insert into simptom(id, naziv, svalue, stype) values (23, 'Bol u grudima', 0, 0)

insert into bolest_simptomi(bolest_id, simptomi_id) values (7, 18)
insert into bolest_simptomi(bolest_id, simptomi_id) values (7, 20)
insert into bolest_simptomi(bolest_id, simptomi_id) values (7, 21)
insert into bolest_simptomi(bolest_id, simptomi_id) values (7, 22)
insert into bolest_simptomi(bolest_id, simptomi_id) values (7, 23)

insert into simptom(id, naziv, svalue, stype) values (24, 'Pacijent boluje od hipertenzije bar 6 meseci', 0, 2)
insert into simptom(id, naziv, svalue, stype) values (25, 'Pacijent boluje od dijabetisa', 0, 2)
insert into BOLEST_SPECIFICNI_SIMPTOMI (bolest_id,  SPECIFICNI_SIMPTOMI_ID) values (7, 24)
insert into BOLEST_SPECIFICNI_SIMPTOMI (bolest_id,  SPECIFICNI_SIMPTOMI_ID) values (7, 25)

---Akutna bubrezna povreda-------
insert into bolest(id, opis, btype) values (8, 'Akutna bubrezna povreda', 2)
insert into simptom(id, naziv, svalue, stype) values (26, 'Dijareja', 0, 0)

insert into bolest_simptomi(bolest_id, simptomi_id) values (8, 18)
insert into bolest_simptomi(bolest_id, simptomi_id) values (8, 21)
insert into bolest_simptomi(bolest_id, simptomi_id) values (8, 22)
insert into bolest_simptomi(bolest_id, simptomi_id) values (8, 26)

insert into simptom(id, naziv, svalue, stype) values (27, 'Oporavlja se od operacije', 0, 0)
insert into BOLEST_SPECIFICNI_SIMPTOMI (bolest_id,  SPECIFICNI_SIMPTOMI_ID) values (8, 27)
insert into simptom(id, naziv, svalue, stype) values (28, 'U poslednjih 14 dana dijagnostikovana bolest koji ima simptom povisene temperature', 0, 2)
insert into simptom(id, naziv, svalue, stype) values (29, 'U poslednjih 21 dana dijagnostikovana bolest za koju prima antibiotike', 0, 2)
insert into BOLEST_SPECIFICNI_SIMPTOMI (bolest_id,  SPECIFICNI_SIMPTOMI_ID) values (8, 28)
insert into BOLEST_SPECIFICNI_SIMPTOMI (bolest_id,  SPECIFICNI_SIMPTOMI_ID) values (8, 29)

