insert into korisnik(id, username, ime, prezime, lozinka, uloga) values (1, 'admin', 'Admin', 'Admin', 'admin', 0)
insert into korisnik(id, username, ime, prezime, lozinka, uloga) values (2, 'lekar', 'Dr', 'Dre', 'lekar', 1)

insert into pacijent(id, ime, prezime) values (1, 'Mali', 'moler')

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

---HIPERTENZIJA-------
insert into bolest(id, opis, btype) values (5, 'Hipertenzija', 1)
insert into simptom(id, naziv, svalue, stype) values (15, 'Visok pritisak', 0, 0)