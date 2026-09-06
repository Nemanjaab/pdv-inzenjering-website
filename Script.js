/* =====================================================
   PDV INŽENJERING
   MAIN JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       PAGE LOADER
    ================================================= */

    const loader = document.querySelector(".page-loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loader) {
                loader.classList.add("hidden");
            }

            document.body.classList.add("page-loaded");

        }, 500);

    });


    /* =================================================
       HEADER SCROLL
    ================================================= */

    const header = document.querySelector(".site-header");

    const handleHeader = () => {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    window.addEventListener("scroll", handleHeader, {
        passive: true
    });

    handleHeader();


    /* =================================================
       MOBILE MENU
    ================================================= */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mobileMenu =
        document.querySelector(".mobile-menu");

    const mobileLinks =
        document.querySelectorAll(".mobile-menu a");


    const closeMenu = () => {

        if (!menuToggle || !mobileMenu) return;

        menuToggle.classList.remove("active");

        mobileMenu.classList.remove("active");

        document.body.classList.remove("menu-open");

    };


    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                mobileMenu.classList.toggle("active");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        });

    }


    mobileLinks.forEach(link => {

        link.addEventListener("click", closeMenu);

    });


    /* =================================================
       SMOOTH ANCHOR SCROLL
    ================================================= */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            });

        });


    /* =================================================
       SCROLL REVEAL
    ================================================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");

                            revealObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    });

                },
                {
                    threshold: .12,
                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =================================================
       STAGGERED REVEAL
    ================================================= */

    const revealGroups =
        document.querySelectorAll(
            ".services-grid, .certificate-tags"
        );


    revealGroups.forEach(group => {

        const children =
            group.children;

        Array.from(children)
            .forEach((child, index) => {

                child.style.transitionDelay =
                    `${index * 80}ms`;

            });

    });


    /* =================================================
       NUMBER COUNTERS
    ================================================= */

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );


    const animateCounter = element => {

        const target =
            parseInt(
                element.dataset.counter,
                10
            );

        const suffix =
            element.dataset.suffix || "";

        if (isNaN(target)) return;

        const duration = 1800;

        const startTime =
            performance.now();


        const update = currentTime => {

            const progress =
                Math.min(
                    (currentTime - startTime) /
                    duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    4
                );


            const current =
                Math.floor(
                    target * eased
                );


            element.textContent =
                current.toLocaleString("sr-RS") +
                suffix;


            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                element.textContent =
                    target.toLocaleString("sr-RS") +
                    suffix;

            }

        };


        requestAnimationFrame(update);

    };


    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            animateCounter(
                                entry.target
                            );

                            counterObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    });

                },
                {
                    threshold: .2
                }
            );


        counters.forEach(counter => {

            counterObserver.observe(counter);

        });

    } else {

        counters.forEach(counter => {

            animateCounter(counter);

        });

    }


    /* =================================================
       CUSTOM CURSOR
    ================================================= */

    const cursorDot =
        document.querySelector(".cursor-dot");

    const cursorOutline =
        document.querySelector(
            ".cursor-outline"
        );


    if (
        cursorDot &&
        cursorOutline &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let outlineX = 0;
        let outlineY = 0;


        window.addEventListener(
            "mousemove",
            event => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;

                cursorDot.style.left =
                    `${mouseX}px`;

                cursorDot.style.top =
                    `${mouseY}px`;

            },
            {
                passive: true
            }
        );


        const animateCursor = () => {

            outlineX +=
                (mouseX - outlineX) *
                .16;

            outlineY +=
                (mouseY - outlineY) *
                .16;


            cursorOutline.style.left =
                `${outlineX}px`;

            cursorOutline.style.top =
                `${outlineY}px`;


            requestAnimationFrame(
                animateCursor
            );

        };


        animateCursor();


        const interactiveElements =
            document.querySelectorAll(
                "a, button, input, textarea, .service-card, .certificate-tags span"
            );


        interactiveElements.forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    cursorOutline
                        .classList
                        .add("hover");

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    cursorOutline
                        .classList
                        .remove("hover");

                }
            );

        });

    } else {

        if (cursorDot)
            cursorDot.style.display = "none";

        if (cursorOutline)
            cursorOutline.style.display = "none";

    }


    /* =================================================
       PARALLAX HERO
    ================================================= */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );


    if (
        heroVisual &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        window.addEventListener(
            "mousemove",
            event => {

                const x =
                    (event.clientX /
                        window.innerWidth -
                        .5);

                const y =
                    (event.clientY /
                        window.innerHeight -
                        .5);


                heroVisual.style.transform =
                    `translateY(-50%)
                     translate(
                        ${x * 18}px,
                        ${y * 18}px
                     )`;

            },
            {
                passive: true
            }
        );

    }


    /* =================================================
       MAGNETIC BUTTONS
    ================================================= */

    const magneticButtons =
        document.querySelectorAll(
            ".button, .nav-cta"
        );


    magneticButtons.forEach(button => {

        button.addEventListener(
            "mousemove",
            event => {

                if (
                    !window.matchMedia(
                        "(pointer: fine)"
                    ).matches
                ) return;


                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                button.style.transform =
                    `translate(
                        ${x * .12}px,
                        ${y * .12}px
                    )`;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    });


    /* =================================================
       SERVICE CARD TILT
    ================================================= */

    const serviceCards =
        document.querySelectorAll(
            ".service-card"
        );


    serviceCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (
                    !window.matchMedia(
                        "(pointer: fine)"
                    ).matches
                ) return;


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateY =
                    ((x / rect.width) - .5) * 5;


                const rotateX =
                    ((y / rect.height) - .5) * -5;


                card.style.transform =
                    `perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-4px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });


    /* =================================================
       ACTIVE NAVIGATION
    ================================================= */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            '.nav-links a[href^="#"]'
        );


    if (
        sections.length &&
        navLinks.length &&
        "IntersectionObserver" in window
    ) {

        const navObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) return;


                        const id =
                            entry.target.id;


                        navLinks.forEach(link => {

                            link.classList.remove(
                                "active"
                            );


                            if (
                                link.getAttribute(
                                    "href"
                                ) === `#${id}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                    });

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px"
                }
            );


        sections.forEach(section => {

            navObserver.observe(section);

        });

    }


    /* =================================================
       CONTACT FORM
       Sends directly to office@pdvinzenjering.rs
       through FormSubmit's AJAX endpoint.
    ================================================= */

    const form =
        document.querySelector(
            ".contact-form"
        );


    if (form) {

        const formMessage =
            form.querySelector(
                ".form-message"
            );

        const submitButton =
            form.querySelector(
                ".submit-button"
            );

        const submitLabel =
            form.querySelector(
                ".submit-label"
            );

        const languageKey =
            "pdv-language";

        const formMessages = {
            sr: {
                idle: "Pošaljite upit",
                sending: "Šaljem...",
                success: "Hvala vam. Poruka je uspešno poslata.",
                error: "Slanje trenutno nije uspelo. Pokušajte ponovo ili pišite na office@pdvinzenjering.rs.",
                invalid: "Proverite obavezna polja i unesite ispravnu email adresu."
            },
            mk: {
                idle: "Испратете барање",
                sending: "Се испраќа...",
                success: "Ви благодариме. Вашата порака е успешно испратена.",
                error: "Пораката моментално не може да се испрати. Обидете се повторно или пишете на office@pdvinzenjering.rs.",
                invalid: "Проверете ги задолжителните полиња и внесете важечка е-пошта."
            },
            en: {
                idle: "Send inquiry",
                sending: "Sending...",
                success: "Thank you. Your message has been sent successfully.",
                error: "The message could not be sent right now. Please try again or email office@pdvinzenjering.rs.",
                invalid: "Please check the required fields and enter a valid email address."
            },
            de: {
                idle: "Anfrage senden",
                sending: "Wird gesendet...",
                success: "Vielen Dank. Ihre Nachricht wurde erfolgreich gesendet.",
                error: "Die Nachricht konnte momentan nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie an office@pdvinzenjering.rs.",
                invalid: "Bitte prüfen Sie die Pflichtfelder und geben Sie eine gültige E-Mail-Adresse ein."
            },
            fr: {
                idle: "Envoyer la demande",
                sending: "Envoi...",
                success: "Merci. Votre message a été envoyé avec succès.",
                error: "Le message n’a pas pu être envoyé pour le moment. Réessayez ou écrivez à office@pdvinzenjering.rs.",
                invalid: "Vérifiez les champs obligatoires et saisissez une adresse e-mail valide."
            },
            ru: {
                idle: "Отправить запрос",
                sending: "Отправка...",
                success: "Спасибо. Ваше сообщение успешно отправлено.",
                error: "Сейчас сообщение отправить не удалось. Повторите попытку или напишите на office@pdvinzenjering.rs.",
                invalid: "Проверьте обязательные поля и укажите корректный адрес электронной почты."
            },
            hr: {
                idle: "Pošaljite upit",
                sending: "Šaljem...",
                success: "Hvala vam. Poruka je uspješno poslana.",
                error: "Slanje trenutno nije uspjelo. Pokušajte ponovno ili pišite na office@pdvinzenjering.rs.",
                invalid: "Provjerite obavezna polja i unesite ispravnu e-mail adresu."
            },
            it: {
                idle: "Invia richiesta",
                sending: "Invio...",
                success: "Grazie. Il messaggio è stato inviato con successo.",
                error: "Al momento non è stato possibile inviare il messaggio. Riprova o scrivi a office@pdvinzenjering.rs.",
                invalid: "Controlla i campi obbligatori e inserisci un indirizzo e-mail valido."
            },
            pl: {
                idle: "Wyślij zapytanie",
                sending: "Wysyłanie...",
                success: "Dziękujemy. Wiadomość została wysłana pomyślnie.",
                error: "Nie udało się teraz wysłać wiadomości. Spróbuj ponownie lub napisz na office@pdvinzenjering.rs.",
                invalid: "Sprawdź wymagane pola i wpisz prawidłowy adres e-mail."
            },
            "zh-CN": {
                idle: "发送询价",
                sending: "正在发送...",
                success: "谢谢。您的消息已成功发送。",
                error: "目前无法发送消息。请重试或发送邮件至 office@pdvinzenjering.rs。",
                invalid: "请检查必填字段并输入有效的电子邮箱地址。"
            },
            es: {
                idle: "Enviar consulta",
                sending: "Enviando...",
                success: "Gracias. Su mensaje se ha enviado correctamente.",
                error: "No se pudo enviar el mensaje en este momento. Inténtelo de nuevo o escriba a office@pdvinzenjering.rs.",
                invalid: "Revise los campos obligatorios e introduzca una dirección de correo válida."
            }
        };

        const getFormLanguage = () => {
            const language =
                localStorage.getItem(languageKey) ||
                "sr";

            return formMessages[language]
                ? language
                : "sr";
        };

        const getFormCopy = () =>
            formMessages[getFormLanguage()];

        const setFormState = (type, text) => {
            if (formMessage) {
                formMessage.textContent = text || "";
                formMessage.classList.remove(
                    "success",
                    "error",
                    "sending"
                );

                if (type) {
                    formMessage.classList.add(type);
                }
            }
        };

        form.addEventListener(
            "submit",
            async event => {

                event.preventDefault();

                const copy =
                    getFormCopy();

                if (!form.checkValidity()) {
                    form.reportValidity();
                    setFormState(
                        "error",
                        copy.invalid
                    );
                    return;
                }

                const formData =
                    new FormData(form);

                // Silent spam trap. Humans never see this field.
                if (
                    String(
                        formData.get("website") || ""
                    ).trim()
                ) {
                    form.reset();
                    setFormState(
                        "success",
                        copy.success
                    );
                    return;
                }

                const name =
                    String(
                        formData.get("name") || ""
                    ).trim();

                const payload = {
                    name,
                    company: String(formData.get("company") || "").trim(),
                    email: String(formData.get("email") || "").trim(),
                    phone: String(formData.get("phone") || "").trim(),
                    message: String(formData.get("message") || "").trim(),
                    _subject: `Novi upit sa PDV Inženjering sajta${name ? ` — ${name}` : ""}`,
                    _template: "table",
                    _captcha: "false"
                };

                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.classList.add(
                        "is-sending"
                    );
                }

                if (submitLabel) {
                    submitLabel.textContent =
                        copy.sending;
                }

                setFormState(
                    "sending",
                    copy.sending
                );

                try {
                    const response =
                        await fetch(
                            "https://formsubmit.co/ajax/office@pdvinzenjering.rs",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Accept": "application/json"
                                },
                                body: JSON.stringify(payload)
                            }
                        );

                    const result =
                        await response.json()
                            .catch(() => ({}));

                    if (
                        !response.ok ||
                        result.success === false ||
                        result.success === "false"
                    ) {
                        throw new Error(
                            result.message ||
                            "FormSubmit request failed"
                        );
                    }

                    form.reset();

                    setFormState(
                        "success",
                        copy.success
                    );

                } catch (error) {
                    console.error(
                        "PDV contact form:",
                        error
                    );

                    setFormState(
                        "error",
                        copy.error
                    );

                } finally {
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.classList.remove(
                            "is-sending"
                        );
                    }

                    if (submitLabel) {
                        submitLabel.textContent =
                            copy.idle;
                    }
                }

            }
        );

    }


    /* =================================================
       IMAGE / ELEMENT MOUSE PARALLAX
    ================================================= */

    const parallaxElements =
        document.querySelectorAll(
            "[data-parallax]"
        );


    if (
        parallaxElements.length &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        window.addEventListener(
            "mousemove",
            event => {

                const x =
                    (event.clientX /
                        window.innerWidth -
                        .5);

                const y =
                    (event.clientY /
                        window.innerHeight -
                        .5);


                parallaxElements.forEach(
                    element => {

                        const speed =
                            parseFloat(
                                element.dataset.parallax
                            ) || 10;


                        element.style.transform =
                            `translate(
                                ${x * speed}px,
                                ${y * speed}px
                            )`;

                    }
                );

            },
            {
                passive: true
            }
        );

    }


    /* =================================================
       CURRENT YEAR
    ================================================= */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =================================================
       ESCAPE KEY
    ================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeMenu();

            }

        }
    );


    /* =================================================
       CONSOLE
    ================================================= */

    console.log(
        "%cPDV INŽENJERING",
        "font-size:20px;font-weight:bold;color:#e87832;"
    );

    console.log(
        "%cKvalitet • Preciznost • Pouzdanost",
        "color:#888;"
    );

});
/* =====================================================
   MULTILINGUAL LANGUAGE SWITCHER
   Serbian: original Latin HTML | Other languages: Google Website Translator
===================================================== */

(() => {
    const languages = [
        { code: "sr", short: "SR", name: "Srpski" },
        { code: "mk", short: "MK", name: "Македонски" },
        { code: "en", short: "EN", name: "English" },
        { code: "de", short: "DE", name: "Deutsch" },
        { code: "fr", short: "FR", name: "Français" },
        { code: "ru", short: "RU", name: "Русский" },
        { code: "hr", short: "HR", name: "Hrvatski" },
        { code: "it", short: "IT", name: "Italiano" },
        { code: "pl", short: "PL", name: "Polski" },
        { code: "zh-CN", short: "中文", name: "中文（简体）" },
        { code: "es", short: "ES", name: "Español" }
    ];

    const storageKey = "pdv-language";

    /* =================================================
       CURATED UI TRANSLATIONS
       Short interface copy is translated manually so Google Translate
       cannot turn labels such as "O nama" into incorrect phrases.
    ================================================= */

    const curatedTranslations = {
        mk: {
            "Početna":"Почетна","O nama":"За нас","Usluge":"Услуги","Projekti":"Проекти","Sertifikati":"Сертификати","Kontakt":"Контакт",
            "Partnerstvo":"Партнерство","dugog veka.":"што трае.","Partnerstvo dugog veka.":"Партнерство што трае.","Partnerstvo koje traje.":"Партнерство што трае.",
            "Naše usluge":"Нашите услуги","O kompaniji":"За компанијата","godina osnivanja":"година на основање","zaposlenih":"вработени","projekata":"проекти",
            "Godina osnivanja":"Година на основање","Broj zaposlenih":"Вработени","Sertifikata":"Сертификати","Realizovanih projekata":"Реализирани проекти","realizovanih projekata":"реализирани проекти",
            "O NAMA":"ЗА НАС","USLUGE":"УСЛУГИ","OBLASTI RADA":"ОБЛАСТИ НА РАБОТА","NAŠI PROJEKTI":"НАШИ ПРОЕКТИ","SERTIFIKATI":"СЕРТИФИКАТИ","KONTAKT":"КОНТАКТ","REFERENCE":"РЕФЕРЕНЦИ",
            "Posvećenost":"Посветеност","i tačnost":"и прецизност","u poštovanju rokova.":"во почитувањето на роковите.",
            "Specijalizovana":"Специјализирани","rešenja":"решенија","za industriju.":"за индустријата.","Iskustvo u":"Искуство во","industriji.":"индустријата.",
            "Reference koje":"Референци што","govore.":"зборуваат сами за себе.","Kontinuirana":"Континуирана","sertifikacija":"сертификација","standarda i kvaliteta.":"според стандарди за квалитет.",
            "Kvalitet.":"Квалитет.","Preciznost.":"Прецизност.","Pouzdanost.":"Сигурност.","Kvalitet. Preciznost. Pouzdanost.":"Квалитет. Прецизност. Сигурност.",
            "Pogledajte reference":"Погледнете ги референците","Započnimo razgovor":"Да започнеме разговор","Razgovarajmo.":"Да разговараме.","Kontaktirajte nas":"Контактирајте нè","Pošaljite upit":"Испратете барање",
            "Ime i prezime":"Име и презиме","Kompanija":"Компанија","Email":"Е-пошта","Telefon":"Телефон","Poruka":"Порака",
            "OBIM USLUGE":"ОБЕМ НА УСЛУГАТА","TEHNIČKI FOKUS":"ТЕХНИЧКИ ФОКУС","KAPACITETI":"КАПАЦИТЕТИ","OSTALE USLUGE":"ДРУГИ УСЛУГИ","STANDARDI":"СТАНДАРДИ","LICENCA":"ЛИЦЕНЦА","RAZVOJ":"РАЗВОЈ","LJUDI I OPREMA":"ЛУЃЕ И ОПРЕМА","TRŽIŠTA":"ПАЗАРИ","IZDVAJAMO":"ИСТАКНУВАМЕ","REALIZOVANO":"РЕАЛИЗИРАНО","RAZVOJ SISTEMA":"РАЗВОЈ НА СИСТЕМОТ",
            "Šta obuhvata":"Што опфаќа","izvođenje.":"изведбата.","Kompletan":"Комплетно","industrijski portfolio.":"индустриско портфолио.",
            "Skelarski radovi":"Работи со скелиња","Termoizolaterski radovi":"Термоизолациски работи","Limarsko-fasaderski radovi":"Лимарски и фасадни работи","Bravarsko-zavarivački radovi":"Браварски и заварувачки работи","Vatrostalno-šamoterski radovi":"Огноотпорни и шамотни работи","Industrijsko čišćenje":"Индустриско чистење","Visinski alpinistički radovi":"Алпинистички работи на висина","Radionička priprema lima":"Работилничка подготовка на лим",
            "Termoelektrane":"Термоелектрани","Spalionice otpada":"Постројки за согорување отпад","Rafinerije nafte":"Нафтени рафинерии","Petrohemija":"Петрохемија","Cementare":"Цементарници","Gradske toplane":"Градски топлани","Drugi industrijski objekti":"Други индустриски објекти",
            "Imate projekat koji zahteva pouzdan tim?":"Имате проект за кој е потребен сигурен тим?","Razgovarajte sa PDV Inženjeringom o obimu radova, rokovima i tehničkim zahtevima.":"Разговарајте со PDV Inženjering за обемот на работите, роковите и техничките барања.",
            "© 2026 PDV Inženjering DOO. Sva prava zadržana.":"© 2026 PDV Inženjering DOO. Сите права се задржани.","Sva prava zadržana.":"Сите права се задржани."
        },
        en: {
            "Početna":"Home","O nama":"About Us","Usluge":"Services","Projekti":"Projects","Sertifikati":"Certificates","Kontakt":"Contact",
            "Partnerstvo":"Partnership","dugog veka.":"built to last.","Partnerstvo dugog veka.":"Partnership built to last.","Partnerstvo koje traje.":"A partnership that lasts.",
            "Naše usluge":"Our Services","O kompaniji":"About the Company","godina osnivanja":"founded","zaposlenih":"employees","projekata":"projects",
            "Godina osnivanja":"Year Founded","Broj zaposlenih":"Employees","Sertifikata":"Certificates","Realizovanih projekata":"Completed Projects","realizovanih projekata":"completed projects",
            "O NAMA":"ABOUT US","USLUGE":"SERVICES","OBLASTI RADA":"INDUSTRIES","NAŠI PROJEKTI":"OUR PROJECTS","SERTIFIKATI":"CERTIFICATES","KONTAKT":"CONTACT","REFERENCE":"REFERENCES",
            "Posvećenost":"Commitment","i tačnost":"and precision","u poštovanju rokova.":"in meeting deadlines.",
            "Specijalizovana":"Specialized","rešenja":"solutions","za industriju.":"for industry.","Iskustvo u":"Experience in","industriji.":"industry.",
            "Reference koje":"References that","govore.":"speak for themselves.","Kontinuirana":"Continuous","sertifikacija":"certification","standarda i kvaliteta.":"of standards and quality.",
            "Kvalitet.":"Quality.","Preciznost.":"Precision.","Pouzdanost.":"Reliability.","Kvalitet. Preciznost. Pouzdanost.":"Quality. Precision. Reliability.",
            "Pogledajte reference":"View References","Započnimo razgovor":"Start a Conversation","Razgovarajmo.":"Let's talk.","Kontaktirajte nas":"Contact Us","Pošaljite upit":"Send Inquiry",
            "Ime i prezime":"Full Name","Kompanija":"Company","Email":"Email","Telefon":"Phone","Poruka":"Message",
            "OBIM USLUGE":"SCOPE OF WORK","TEHNIČKI FOKUS":"TECHNICAL FOCUS","KAPACITETI":"CAPABILITIES","OSTALE USLUGE":"OTHER SERVICES","STANDARDI":"STANDARDS","LICENCA":"LICENSE","RAZVOJ":"DEVELOPMENT","LJUDI I OPREMA":"PEOPLE & EQUIPMENT","TRŽIŠTA":"MARKETS","IZDVAJAMO":"HIGHLIGHTS","REALIZOVANO":"DELIVERED","RAZVOJ SISTEMA":"SYSTEM DEVELOPMENT",
            "Šta obuhvata":"What the work","izvođenje.":"includes.","Kompletan":"Complete","industrijski portfolio.":"industrial portfolio.",
            "Skelarski radovi":"Scaffolding Works","Termoizolaterski radovi":"Thermal Insulation Works","Limarsko-fasaderski radovi":"Sheet Metal & Cladding Works","Bravarsko-zavarivački radovi":"Metalwork & Welding","Vatrostalno-šamoterski radovi":"Refractory Works","Industrijsko čišćenje":"Industrial Cleaning","Visinski alpinistički radovi":"Industrial Rope Access","Radionička priprema lima":"Workshop Sheet-Metal Fabrication",
            "Termoelektrane":"Thermal Power Plants","Spalionice otpada":"Waste-to-Energy Plants","Rafinerije nafte":"Oil Refineries","Petrohemija":"Petrochemical Plants","Cementare":"Cement Plants","Gradske toplane":"District Heating Plants","Drugi industrijski objekti":"Other Industrial Facilities",
            "Imate projekat koji zahteva pouzdan tim?":"Do you have a project that requires a reliable team?","Razgovarajte sa PDV Inženjeringom o obimu radova, rokovima i tehničkim zahtevima.":"Talk to PDV Inženjering about the scope of work, schedule and technical requirements.",
            "© 2026 PDV Inženjering DOO. Sva prava zadržana.":"© 2026 PDV Inženjering DOO. All rights reserved.","Sva prava zadržana.":"All rights reserved."
        },
        de: {
            "Početna":"Startseite","O nama":"Über uns","Usluge":"Leistungen","Projekti":"Projekte","Sertifikati":"Zertifikate","Kontakt":"Kontakt",
            "Partnerstvo":"Partnerschaft","dugog veka.":"mit Bestand.","Partnerstvo dugog veka.":"Partnerschaft mit Bestand.","Partnerstvo koje traje.":"Eine Partnerschaft, die Bestand hat.",
            "Naše usluge":"Unsere Leistungen","O kompaniji":"Über das Unternehmen","godina osnivanja":"Gründungsjahr","zaposlenih":"Mitarbeitende","projekata":"Projekte",
            "Godina osnivanja":"Gründungsjahr","Broj zaposlenih":"Mitarbeitende","Sertifikata":"Zertifikate","Realizovanih projekata":"Realisierte Projekte","realizovanih projekata":"realisierte Projekte",
            "O NAMA":"ÜBER UNS","USLUGE":"LEISTUNGEN","OBLASTI RADA":"BRANCHEN","NAŠI PROJEKTI":"UNSERE PROJEKTE","SERTIFIKATI":"ZERTIFIKATE","KONTAKT":"KONTAKT","REFERENCE":"REFERENZEN",
            "Posvećenost":"Engagement","i tačnost":"und Präzision","u poštovanju rokova.":"bei der Einhaltung von Terminen.",
            "Specijalizovana":"Spezialisierte","rešenja":"Lösungen","za industriju.":"für die Industrie.","Iskustvo u":"Erfahrung in","industriji.":"der Industrie.",
            "Reference koje":"Referenzen, die","govore.":"für sich sprechen.","Kontinuirana":"Kontinuierliche","sertifikacija":"Zertifizierung","standarda i kvaliteta.":"von Standards und Qualität.",
            "Kvalitet.":"Qualität.","Preciznost.":"Präzision.","Pouzdanost.":"Zuverlässigkeit.","Kvalitet. Preciznost. Pouzdanost.":"Qualität. Präzision. Zuverlässigkeit.",
            "Pogledajte reference":"Referenzen ansehen","Započnimo razgovor":"Gespräch beginnen","Razgovarajmo.":"Sprechen wir darüber.","Kontaktirajte nas":"Kontaktieren Sie uns","Pošaljite upit":"Anfrage senden",
            "Ime i prezime":"Vor- und Nachname","Kompanija":"Unternehmen","Email":"E-Mail","Telefon":"Telefon","Poruka":"Nachricht",
            "OBIM USLUGE":"LEISTUNGSUMFANG","TEHNIČKI FOKUS":"TECHNISCHER FOKUS","KAPACITETI":"KAPAZITÄTEN","OSTALE USLUGE":"WEITERE LEISTUNGEN","STANDARDI":"STANDARDS","LICENCA":"LIZENZ","RAZVOJ":"ENTWICKLUNG","LJUDI I OPREMA":"PERSONAL & AUSRÜSTUNG","TRŽIŠTA":"MÄRKTE","IZDVAJAMO":"HIGHLIGHTS","REALIZOVANO":"REALISIERT","RAZVOJ SISTEMA":"SYSTEMENTWICKLUNG",
            "Šta obuhvata":"Leistungsumfang","izvođenje.":"im Überblick.","Kompletan":"Komplettes","industrijski portfolio.":"Industrieportfolio.",
            "Skelarski radovi":"Gerüstbauarbeiten","Termoizolaterski radovi":"Wärmedämmarbeiten","Limarsko-fasaderski radovi":"Blech- und Fassadenarbeiten","Bravarsko-zavarivački radovi":"Schlosser- und Schweißarbeiten","Vatrostalno-šamoterski radovi":"Feuerfestarbeiten","Industrijsko čišćenje":"Industriereinigung","Visinski alpinistički radovi":"Industrieklettern","Radionička priprema lima":"Werkstattfertigung von Blechteilen",
            "Termoelektrane":"Wärmekraftwerke","Spalionice otpada":"Müllverbrennungsanlagen","Rafinerije nafte":"Ölraffinerien","Petrohemija":"Petrochemie","Cementare":"Zementwerke","Gradske toplane":"Fernheizwerke","Drugi industrijski objekti":"Weitere Industrieanlagen",
            "Imate projekat koji zahteva pouzdan tim?":"Haben Sie ein Projekt, das ein zuverlässiges Team erfordert?","Razgovarajte sa PDV Inženjeringom o obimu radova, rokovima i tehničkim zahtevima.":"Sprechen Sie mit PDV Inženjering über Leistungsumfang, Termine und technische Anforderungen.",
            "© 2026 PDV Inženjering DOO. Sva prava zadržana.":"© 2026 PDV Inženjering DOO. Alle Rechte vorbehalten.","Sva prava zadržana.":"Alle Rechte vorbehalten."
        },
        fr: {
            "Početna":"Accueil","O nama":"À propos","Usluge":"Services","Projekti":"Projets","Sertifikati":"Certifications","Kontakt":"Contact",
            "Partnerstvo":"Un partenariat","dugog veka.":"fait pour durer.","Partnerstvo dugog veka.":"Un partenariat fait pour durer.","Partnerstvo koje traje.":"Un partenariat durable.",
            "Naše usluge":"Nos services","O kompaniji":"À propos de l’entreprise","godina osnivanja":"année de fondation","zaposlenih":"collaborateurs","projekata":"projets",
            "Godina osnivanja":"Année de fondation","Broj zaposlenih":"Collaborateurs","Sertifikata":"Certifications","Realizovanih projekata":"Projets réalisés","realizovanih projekata":"projets réalisés",
            "O NAMA":"À PROPOS","USLUGE":"SERVICES","OBLASTI RADA":"SECTEURS","NAŠI PROJEKTI":"NOS PROJETS","SERTIFIKATI":"CERTIFICATIONS","KONTAKT":"CONTACT","REFERENCE":"RÉFÉRENCES",
            "Posvećenost":"Engagement","i tačnost":"et précision","u poštovanju rokova.":"dans le respect des délais.",
            "Specijalizovana":"Solutions","rešenja":"spécialisées","za industriju.":"pour l’industrie.","Iskustvo u":"Expérience dans","industriji.":"l’industrie.",
            "Reference koje":"Des références qui","govore.":"parlent d’elles-mêmes.","Kontinuirana":"Certification","sertifikacija":"continue","standarda i kvaliteta.":"des normes et de la qualité.",
            "Kvalitet.":"Qualité.","Preciznost.":"Précision.","Pouzdanost.":"Fiabilité.","Kvalitet. Preciznost. Pouzdanost.":"Qualité. Précision. Fiabilité.",
            "Pogledajte reference":"Voir les références","Započnimo razgovor":"Parlons de votre projet","Razgovarajmo.":"Parlons-en.","Kontaktirajte nas":"Nous contacter","Pošaljite upit":"Envoyer la demande",
            "Ime i prezime":"Nom et prénom","Kompanija":"Entreprise","Email":"E-mail","Telefon":"Téléphone","Poruka":"Message",
            "OBIM USLUGE":"PÉRIMÈTRE DES TRAVAUX","TEHNIČKI FOKUS":"FOCUS TECHNIQUE","KAPACITETI":"CAPACITÉS","OSTALE USLUGE":"AUTRES SERVICES","STANDARDI":"NORMES","LICENCA":"LICENCE","RAZVOJ":"DÉVELOPPEMENT","LJUDI I OPREMA":"ÉQUIPES & ÉQUIPEMENTS","TRŽIŠTA":"MARCHÉS","IZDVAJAMO":"À LA UNE","REALIZOVANO":"RÉALISÉ","RAZVOJ SISTEMA":"DÉVELOPPEMENT DU SYSTÈME",
            "Šta obuhvata":"Ce que comprend","izvođenje.":"la prestation.","Kompletan":"Un portefeuille","industrijski portfolio.":"industriel complet.",
            "Skelarski radovi":"Travaux d’échafaudage","Termoizolaterski radovi":"Travaux d’isolation thermique","Limarsko-fasaderski radovi":"Travaux de bardage et de façade","Bravarsko-zavarivački radovi":"Métallerie et soudage","Vatrostalno-šamoterski radovi":"Travaux réfractaires","Industrijsko čišćenje":"Nettoyage industriel","Visinski alpinistički radovi":"Travaux sur cordes","Radionička priprema lima":"Préfabrication de tôlerie en atelier",
            "Termoelektrane":"Centrales thermiques","Spalionice otpada":"Unités d’incinération des déchets","Rafinerije nafte":"Raffineries de pétrole","Petrohemija":"Pétrochimie","Cementare":"Cimenteries","Gradske toplane":"Chaufferies urbaines","Drugi industrijski objekti":"Autres installations industrielles",
            "Imate projekat koji zahteva pouzdan tim?":"Vous avez un projet qui exige une équipe fiable ?","Razgovarajte sa PDV Inženjeringom o obimu radova, rokovima i tehničkim zahtevima.":"Échangez avec PDV Inženjering sur le périmètre des travaux, les délais et les exigences techniques.",
            "© 2026 PDV Inženjering DOO. Sva prava zadržana.":"© 2026 PDV Inženjering DOO. Tous droits réservés.","Sva prava zadržana.":"Tous droits réservés."
        },
        ru: {
            "Početna":"Главная","O nama":"О нас","Usluge":"Услуги","Projekti":"Проекты","Sertifikati":"Сертификаты","Kontakt":"Контакты",
            "Partnerstvo":"Партнёрство","dugog veka.":"на долгие годы.","Partnerstvo dugog veka.":"Партнёрство на долгие годы.","Partnerstvo koje traje.":"Партнёрство, которое длится.",
            "Naše usluge":"Наши услуги","O kompaniji":"О компании","godina osnivanja":"год основания","zaposlenih":"сотрудников","projekata":"проектов",
            "Godina osnivanja":"Год основания","Broj zaposlenih":"Сотрудники","Sertifikata":"Сертификаты","Realizovanih projekata":"Реализованные проекты","realizovanih projekata":"реализованных проектов",
            "O NAMA":"О НАС","USLUGE":"УСЛУГИ","OBLASTI RADA":"ОТРАСЛИ","NAŠI PROJEKTI":"НАШИ ПРОЕКТЫ","SERTIFIKATI":"СЕРТИФИКАТЫ","KONTAKT":"КОНТАКТЫ","REFERENCE":"РЕФЕРЕНЦИИ",
            "Posvećenost":"Ответственность","i tačnost":"и точность","u poštovanju rokova.":"в соблюдении сроков.",
            "Specijalizovana":"Специализированные","rešenja":"решения","za industriju.":"для промышленности.","Iskustvo u":"Опыт в","industriji.":"промышленности.",
            "Reference koje":"Референции, которые","govore.":"говорят сами за себя.","Kontinuirana":"Непрерывная","sertifikacija":"сертификация","standarda i kvaliteta.":"стандартов и качества.",
            "Kvalitet.":"Качество.","Preciznost.":"Точность.","Pouzdanost.":"Надёжность.","Kvalitet. Preciznost. Pouzdanost.":"Качество. Точность. Надёжность.",
            "Pogledajte reference":"Посмотреть референции","Započnimo razgovor":"Начать разговор","Razgovarajmo.":"Давайте обсудим.","Kontaktirajte nas":"Связаться с нами","Pošaljite upit":"Отправить запрос",
            "Ime i prezime":"Имя и фамилия","Kompanija":"Компания","Email":"Эл. почта","Telefon":"Телефон","Poruka":"Сообщение",
            "OBIM USLUGE":"ОБЪЁМ РАБОТ","TEHNIČKI FOKUS":"ТЕХНИЧЕСКИЙ ФОКУС","KAPACITETI":"ВОЗМОЖНОСТИ","OSTALE USLUGE":"ДРУГИЕ УСЛУГИ","STANDARDI":"СТАНДАРТЫ","LICENCA":"ЛИЦЕНЗИЯ","RAZVOJ":"РАЗВИТИЕ","LJUDI I OPREMA":"ПЕРСОНАЛ И ОБОРУДОВАНИЕ","TRŽIŠTA":"РЫНКИ","IZDVAJAMO":"ОСНОВНОЕ","REALIZOVANO":"РЕАЛИЗОВАНО","RAZVOJ SISTEMA":"РАЗВИТИЕ СИСТЕМЫ",
            "Šta obuhvata":"Что включает","izvođenje.":"выполнение работ.","Kompletan":"Полный","industrijski portfolio.":"промышленный портфель.",
            "Skelarski radovi":"Монтаж строительных лесов","Termoizolaterski radovi":"Теплоизоляционные работы","Limarsko-fasaderski radovi":"Жестяные и фасадные работы","Bravarsko-zavarivački radovi":"Слесарно-сварочные работы","Vatrostalno-šamoterski radovi":"Огнеупорные работы","Industrijsko čišćenje":"Промышленная очистка","Visinski alpinistički radovi":"Промышленный альпинизм","Radionička priprema lima":"Цеховая подготовка листового металла",
            "Termoelektrane":"Тепловые электростанции","Spalionice otpada":"Мусоросжигательные заводы","Rafinerije nafte":"Нефтеперерабатывающие заводы","Petrohemija":"Нефтехимия","Cementare":"Цементные заводы","Gradske toplane":"Городские котельные","Drugi industrijski objekti":"Другие промышленные объекты",
            "Imate projekat koji zahteva pouzdan tim?":"У вас есть проект, которому нужна надёжная команда?","Razgovarajte sa PDV Inženjeringom o obimu radova, rokovima i tehničkim zahtevima.":"Обсудите с PDV Inženjering объём работ, сроки и технические требования.",
            "© 2026 PDV Inženjering DOO. Sva prava zadržana.":"© 2026 PDV Inženjering DOO. Все права защищены.","Sva prava zadržana.":"Все права защищены."
        },
        hr: {
            "Početna":"Početna","O nama":"O nama","Usluge":"Usluge","Projekti":"Projekti","Sertifikati":"Certifikati","Kontakt":"Kontakt",
            "Partnerstvo":"Partnerstvo","dugog veka.":"dugog vijeka.","Partnerstvo dugog veka.":"Partnerstvo dugog vijeka.","Partnerstvo koje traje.":"Partnerstvo koje traje.",
            "Naše usluge":"Naše usluge","O kompaniji":"O tvrtki","godina osnivanja":"godina osnivanja","zaposlenih":"zaposlenih","projekata":"projekata",
            "Godina osnivanja":"Godina osnivanja","Broj zaposlenih":"Broj zaposlenih","Sertifikata":"Certifikata","Realizovanih projekata":"Realiziranih projekata","realizovanih projekata":"realiziranih projekata",
            "O NAMA":"O NAMA","USLUGE":"USLUGE","OBLASTI RADA":"PODRUČJA RADA","NAŠI PROJEKTI":"NAŠI PROJEKTI","SERTIFIKATI":"CERTIFIKATI","KONTAKT":"KONTAKT","REFERENCE":"REFERENCE",
            "Posvećenost":"Posvećenost","i tačnost":"i točnost","u poštovanju rokova.":"u poštovanju rokova.",
            "Specijalizovana":"Specijalizirana","rešenja":"rješenja","za industriju.":"za industriju.","Iskustvo u":"Iskustvo u","industriji.":"industriji.",
            "Reference koje":"Reference koje","govore.":"govore same za sebe.","Kontinuirana":"Kontinuirana","sertifikacija":"certifikacija","standarda i kvaliteta.":"standarda i kvalitete.",
            "Kvalitet.":"Kvaliteta.","Preciznost.":"Preciznost.","Pouzdanost.":"Pouzdanost.","Kvalitet. Preciznost. Pouzdanost.":"Kvaliteta. Preciznost. Pouzdanost.",
            "Pogledajte reference":"Pogledajte reference","Započnimo razgovor":"Započnimo razgovor","Razgovarajmo.":"Razgovarajmo.","Kontaktirajte nas":"Kontaktirajte nas","Pošaljite upit":"Pošaljite upit",
            "Ime i prezime":"Ime i prezime","Kompanija":"Tvrtka","Email":"E-mail","Telefon":"Telefon","Poruka":"Poruka",
            "OBIM USLUGE":"OPSEG USLUGE","TEHNIČKI FOKUS":"TEHNIČKI FOKUS","KAPACITETI":"KAPACITETI","OSTALE USLUGE":"OSTALE USLUGE","STANDARDI":"STANDARDI","LICENCA":"LICENCA","RAZVOJ":"RAZVOJ","LJUDI I OPREMA":"LJUDI I OPREMA","TRŽIŠTA":"TRŽIŠTA","IZDVAJAMO":"IZDVAJAMO","REALIZOVANO":"REALIZIRANO","RAZVOJ SISTEMA":"RAZVOJ SUSTAVA",
            "Šta obuhvata":"Što obuhvaća","izvođenje.":"izvođenje.","Kompletan":"Kompletan","industrijski portfolio.":"industrijski portfelj.",
            "Skelarski radovi":"Skelarski radovi","Termoizolaterski radovi":"Termoizolaterski radovi","Limarsko-fasaderski radovi":"Limarsko-fasaderski radovi","Bravarsko-zavarivački radovi":"Bravarsko-zavarivački radovi","Vatrostalno-šamoterski radovi":"Vatrostalno-šamotni radovi","Industrijsko čišćenje":"Industrijsko čišćenje","Visinski alpinistički radovi":"Visinski alpinistički radovi","Radionička priprema lima":"Radionička priprema lima",
            "Termoelektrane":"Termoelektrane","Spalionice otpada":"Spalionice otpada","Rafinerije nafte":"Rafinerije nafte","Petrohemija":"Petrokemija","Cementare":"Cementare","Gradske toplane":"Gradske toplane","Drugi industrijski objekti":"Drugi industrijski objekti",
            "Imate projekat koji zahteva pouzdan tim?":"Imate projekt koji zahtijeva pouzdan tim?","Razgovarajte sa PDV Inženjeringom o obimu radova, rokovima i tehničkim zahtevima.":"Razgovarajte s PDV Inženjeringom o opsegu radova, rokovima i tehničkim zahtjevima.",
            "© 2026 PDV Inženjering DOO. Sva prava zadržana.":"© 2026 PDV Inženjering DOO. Sva prava pridržana.","Sva prava zadržana.":"Sva prava pridržana."
        },
        it: {
            "Početna":"Home","O nama":"Chi siamo","Usluge":"Servizi","Projekti":"Progetti","Sertifikati":"Certificazioni","Kontakt":"Contatti",
            "Partnerstvo":"Una partnership","dugog veka.":"destinata a durare.","Partnerstvo dugog veka.":"Una partnership destinata a durare.","Partnerstvo koje traje.":"Una partnership che dura nel tempo.",
            "Naše usluge":"I nostri servizi","O kompaniji":"L’azienda","godina osnivanja":"anno di fondazione","zaposlenih":"dipendenti","projekata":"progetti",
            "Godina osnivanja":"Anno di fondazione","Broj zaposlenih":"Dipendenti","Sertifikata":"Certificazioni","Realizovanih projekata":"Progetti realizzati","realizovanih projekata":"progetti realizzati",
            "O NAMA":"CHI SIAMO","USLUGE":"SERVIZI","OBLASTI RADA":"SETTORI","NAŠI PROJEKTI":"I NOSTRI PROGETTI","SERTIFIKATI":"CERTIFICAZIONI","KONTAKT":"CONTATTI","REFERENCE":"REFERENZE",
            "Posvećenost":"Impegno","i tačnost":"e precisione","u poštovanju rokova.":"nel rispetto delle scadenze.",
            "Specijalizovana":"Soluzioni","rešenja":"specializzate","za industriju.":"per l’industria.","Iskustvo u":"Esperienza nell’","industriji.":"industria.",
            "Reference koje":"Referenze che","govore.":"parlano da sole.","Kontinuirana":"Certificazione","sertifikacija":"continua","standarda i kvaliteta.":"di standard e qualità.",
            "Kvalitet.":"Qualità.","Preciznost.":"Precisione.","Pouzdanost.":"Affidabilità.","Kvalitet. Preciznost. Pouzdanost.":"Qualità. Precisione. Affidabilità.",
            "Pogledajte reference":"Vedi le referenze","Započnimo razgovor":"Iniziamo a parlare","Razgovarajmo.":"Parliamone.","Kontaktirajte nas":"Contattaci","Pošaljite upit":"Invia richiesta",
            "Ime i prezime":"Nome e cognome","Kompanija":"Azienda","Email":"E-mail","Telefon":"Telefono","Poruka":"Messaggio",
            "OBIM USLUGE":"AMBITO DEL SERVIZIO","TEHNIČKI FOKUS":"FOCUS TECNICO","KAPACITETI":"CAPACITÀ","OSTALE USLUGE":"ALTRI SERVIZI","STANDARDI":"STANDARD","LICENCA":"LICENZA","RAZVOJ":"SVILUPPO","LJUDI I OPREMA":"PERSONE & ATTREZZATURE","TRŽIŠTA":"MERCATI","IZDVAJAMO":"IN EVIDENZA","REALIZOVANO":"REALIZZATO","RAZVOJ SISTEMA":"SVILUPPO DEL SISTEMA",
            "Šta obuhvata":"Cosa comprende","izvođenje.":"l’esecuzione.","Kompletan":"Un portafoglio","industrijski portfolio.":"industriale completo.",
            "Skelarski radovi":"Ponteggi industriali","Termoizolaterski radovi":"Isolamento termico","Limarsko-fasaderski radovi":"Lattoneria e facciate","Bravarsko-zavarivački radovi":"Carpenteria e saldatura","Vatrostalno-šamoterski radovi":"Opere refrattarie","Industrijsko čišćenje":"Pulizia industriale","Visinski alpinistički radovi":"Lavori su fune","Radionička priprema lima":"Prefabbricazione di lamiera in officina",
            "Termoelektrane":"Centrali termoelettriche","Spalionice otpada":"Impianti di termovalorizzazione","Rafinerije nafte":"Raffinerie di petrolio","Petrohemija":"Petrolchimica","Cementare":"Cementifici","Gradske toplane":"Centrali di teleriscaldamento","Drugi industrijski objekti":"Altri impianti industriali",
            "Imate projekat koji zahteva pouzdan tim?":"Hai un progetto che richiede un team affidabile?","Razgovarajte sa PDV Inženjeringom o obimu radova, rokovima i tehničkim zahtevima.":"Parla con PDV Inženjering dell’ambito dei lavori, delle tempistiche e dei requisiti tecnici.",
            "© 2026 PDV Inženjering DOO. Sva prava zadržana.":"© 2026 PDV Inženjering DOO. Tutti i diritti riservati.","Sva prava zadržana.":"Tutti i diritti riservati."
        },
        pl: {
            "Početna":"Strona główna","O nama":"O nas","Usluge":"Usługi","Projekti":"Projekty","Sertifikati":"Certyfikaty","Kontakt":"Kontakt",
            "Partnerstvo":"Partnerstwo","dugog veka.":"na lata.","Partnerstvo dugog veka.":"Partnerstwo na lata.","Partnerstvo koje traje.":"Partnerstwo, które trwa.",
            "Naše usluge":"Nasze usługi","O kompaniji":"O firmie","godina osnivanja":"rok założenia","zaposlenih":"pracowników","projekata":"projektów",
            "Godina osnivanja":"Rok założenia","Broj zaposlenih":"Liczba pracowników","Sertifikata":"Certyfikaty","Realizovanih projekata":"Zrealizowane projekty","realizovanih projekata":"zrealizowanych projektów",
            "O NAMA":"O NAS","USLUGE":"USŁUGI","OBLASTI RADA":"BRANŻE","NAŠI PROJEKTI":"NASZE PROJEKTY","SERTIFIKATI":"CERTYFIKATY","KONTAKT":"KONTAKT","REFERENCE":"REFERENCJE",
            "Posvećenost":"Zaangażowanie","i tačnost":"i precyzja","u poštovanju rokova.":"w dotrzymywaniu terminów.",
            "Specijalizovana":"Specjalistyczne","rešenja":"rozwiązania","za industriju.":"dla przemysłu.","Iskustvo u":"Doświadczenie w","industriji.":"przemyśle.",
            "Reference koje":"Referencje, które","govore.":"mówią same za siebie.","Kontinuirana":"Ciągła","sertifikacija":"certyfikacja","standarda i kvaliteta.":"standardów i jakości.",
            "Kvalitet.":"Jakość.","Preciznost.":"Precyzja.","Pouzdanost.":"Niezawodność.","Kvalitet. Preciznost. Pouzdanost.":"Jakość. Precyzja. Niezawodność.",
            "Pogledajte reference":"Zobacz referencje","Započnimo razgovor":"Rozpocznijmy rozmowę","Razgovarajmo.":"Porozmawiajmy.","Kontaktirajte nas":"Skontaktuj się z nami","Pošaljite upit":"Wyślij zapytanie",
            "Ime i prezime":"Imię i nazwisko","Kompanija":"Firma","Email":"E-mail","Telefon":"Telefon","Poruka":"Wiadomość",
            "OBIM USLUGE":"ZAKRES USŁUGI","TEHNIČKI FOKUS":"ASPEKT TECHNICZNY","KAPACITETI":"MOŻLIWOŚCI","OSTALE USLUGE":"POZOSTAŁE USŁUGI","STANDARDI":"STANDARDY","LICENCA":"LICENCJA","RAZVOJ":"ROZWÓJ","LJUDI I OPREMA":"LUDZIE I SPRZĘT","TRŽIŠTA":"RYNKI","IZDVAJAMO":"WYRÓŻNIONE","REALIZOVANO":"ZREALIZOWANO","RAZVOJ SISTEMA":"ROZWÓJ SYSTEMU",
            "Šta obuhvata":"Co obejmuje","izvođenje.":"realizacja.","Kompletan":"Kompletny","industrijski portfolio.":"portfel przemysłowy.",
            "Skelarski radovi":"Prace rusztowaniowe","Termoizolaterski radovi":"Izolacje termiczne","Limarsko-fasaderski radovi":"Prace blacharskie i elewacyjne","Bravarsko-zavarivački radovi":"Prace ślusarsko-spawalnicze","Vatrostalno-šamoterski radovi":"Prace ogniotrwałe","Industrijsko čišćenje":"Czyszczenie przemysłowe","Visinski alpinistički radovi":"Prace wysokościowe","Radionička priprema lima":"Warsztatowe przygotowanie blachy",
            "Termoelektrane":"Elektrownie cieplne","Spalionice otpada":"Spalarnie odpadów","Rafinerije nafte":"Rafinerie ropy naftowej","Petrohemija":"Petrochemia","Cementare":"Cementownie","Gradske toplane":"Ciepłownie miejskie","Drugi industrijski objekti":"Inne obiekty przemysłowe",
            "Imate projekat koji zahteva pouzdan tim?":"Masz projekt, który wymaga niezawodnego zespołu?","Razgovarajte sa PDV Inženjeringom o obimu radova, rokovima i tehničkim zahtevima.":"Porozmawiaj z PDV Inženjering o zakresie prac, terminach i wymaganiach technicznych.",
            "© 2026 PDV Inženjering DOO. Sva prava zadržana.":"© 2026 PDV Inženjering DOO. Wszelkie prawa zastrzeżone.","Sva prava zadržana.":"Wszelkie prawa zastrzeżone."
        },
        "zh-CN": {
            "Početna":"首页","O nama":"关于我们","Usluge":"服务","Projekti":"项目","Sertifikati":"认证","Kontakt":"联系我们",
            "Partnerstvo":"合作","dugog veka.":"历久弥新。","Partnerstvo dugog veka.":"长久合作。","Partnerstvo koje traje.":"持久的合作关系。",
            "Naše usluge":"我们的服务","O kompaniji":"关于公司","godina osnivanja":"成立年份","zaposlenih":"名员工","projekata":"个项目",
            "Godina osnivanja":"成立年份","Broj zaposlenih":"员工人数","Sertifikata":"认证","Realizovanih projekata":"已完成项目","realizovanih projekata":"已完成项目",
            "O NAMA":"关于我们","USLUGE":"服务","OBLASTI RADA":"业务领域","NAŠI PROJEKTI":"我们的项目","SERTIFIKATI":"认证","KONTAKT":"联系我们","REFERENCE":"项目业绩",
            "Posvećenost":"专注","i tačnost":"与精准","u poštovanju rokova.":"确保按期交付。",
            "Specijalizovana":"专业","rešenja":"解决方案","za industriju.":"服务工业领域。","Iskustvo u":"深耕","industriji.":"工业领域。",
            "Reference koje":"项目业绩","govore.":"彰显实力。","Kontinuirana":"持续","sertifikacija":"认证","standarda i kvaliteta.":"标准与质量体系。",
            "Kvalitet.":"质量。","Preciznost.":"精准。","Pouzdanost.":"可靠。","Kvalitet. Preciznost. Pouzdanost.":"质量。精准。可靠。",
            "Pogledajte reference":"查看项目业绩","Započnimo razgovor":"开始洽谈","Razgovarajmo.":"欢迎洽谈。","Kontaktirajte nas":"联系我们","Pošaljite upit":"发送询价",
            "Ime i prezime":"姓名","Kompanija":"公司","Email":"电子邮箱","Telefon":"电话","Poruka":"留言",
            "OBIM USLUGE":"服务范围","TEHNIČKI FOKUS":"技术重点","KAPACITETI":"能力范围","OSTALE USLUGE":"其他服务","STANDARDI":"标准","LICENCA":"资质许可","RAZVOJ":"发展","LJUDI I OPREMA":"人员与设备","TRŽIŠTA":"市场","IZDVAJAMO":"重点项目","REALIZOVANO":"已完成","RAZVOJ SISTEMA":"体系发展",
            "Šta obuhvata":"工作","izvođenje.":"内容范围。","Kompletan":"完整的","industrijski portfolio.":"工业服务组合。",
            "Skelarski radovi":"脚手架工程","Termoizolaterski radovi":"工业保温工程","Limarsko-fasaderski radovi":"金属板与幕墙工程","Bravarsko-zavarivački radovi":"金属加工与焊接","Vatrostalno-šamoterski radovi":"耐火工程","Industrijsko čišćenje":"工业清洁","Visinski alpinistički radovi":"工业绳索高空作业","Radionička priprema lima":"车间金属板预制",
            "Termoelektrane":"火力发电厂","Spalionice otpada":"垃圾焚烧发电厂","Rafinerije nafte":"炼油厂","Petrohemija":"石油化工","Cementare":"水泥厂","Gradske toplane":"城市供热站","Drugi industrijski objekti":"其他工业设施",
            "Imate projekat koji zahteva pouzdan tim?":"您的项目需要一支可靠的团队吗？","Razgovarajte sa PDV Inženjeringom o obimu radova, rokovima i tehničkim zahtevima.":"欢迎与 PDV Inženjering 沟通工作范围、工期及技术要求。",
            "© 2026 PDV Inženjering DOO. Sva prava zadržana.":"© 2026 PDV Inženjering DOO. 保留所有权利。","Sva prava zadržana.":"保留所有权利。"
        },
        es: {
            "Početna":"Inicio","O nama":"Nosotros","Usluge":"Servicios","Projekti":"Proyectos","Sertifikati":"Certificaciones","Kontakt":"Contacto",
            "Partnerstvo":"Una alianza","dugog veka.":"duradera.","Partnerstvo dugog veka.":"Una alianza duradera.","Partnerstvo koje traje.":"Una alianza que perdura.",
            "Naše usluge":"Nuestros servicios","O kompaniji":"Sobre la empresa","godina osnivanja":"año de fundación","zaposlenih":"empleados","projekata":"proyectos",
            "Godina osnivanja":"Año de fundación","Broj zaposlenih":"Empleados","Sertifikata":"Certificaciones","Realizovanih projekata":"Proyectos realizados","realizovanih projekata":"proyectos realizados",
            "O NAMA":"NOSOTROS","USLUGE":"SERVICIOS","OBLASTI RADA":"SECTORES","NAŠI PROJEKTI":"NUESTROS PROYECTOS","SERTIFIKATI":"CERTIFICACIONES","KONTAKT":"CONTACTO","REFERENCE":"REFERENCIAS",
            "Posvećenost":"Compromiso","i tačnost":"y precisión","u poštovanju rokova.":"en el cumplimiento de plazos.",
            "Specijalizovana":"Soluciones","rešenja":"especializadas","za industriju.":"para la industria.","Iskustvo u":"Experiencia en","industriji.":"la industria.",
            "Reference koje":"Referencias que","govore.":"hablan por sí solas.","Kontinuirana":"Certificación","sertifikacija":"continua","standarda i kvaliteta.":"de estándares y calidad.",
            "Kvalitet.":"Calidad.","Preciznost.":"Precisión.","Pouzdanost.":"Fiabilidad.","Kvalitet. Preciznost. Pouzdanost.":"Calidad. Precisión. Fiabilidad.",
            "Pogledajte reference":"Ver referencias","Započnimo razgovor":"Hablemos de su proyecto","Razgovarajmo.":"Hablemos.","Kontaktirajte nas":"Contáctenos","Pošaljite upit":"Enviar consulta",
            "Ime i prezime":"Nombre y apellidos","Kompanija":"Empresa","Email":"Correo electrónico","Telefon":"Teléfono","Poruka":"Mensaje",
            "OBIM USLUGE":"ALCANCE DEL SERVICIO","TEHNIČKI FOKUS":"ENFOQUE TÉCNICO","KAPACITETI":"CAPACIDADES","OSTALE USLUGE":"OTROS SERVICIOS","STANDARDI":"ESTÁNDARES","LICENCA":"LICENCIA","RAZVOJ":"DESARROLLO","LJUDI I OPREMA":"PERSONAS Y EQUIPOS","TRŽIŠTA":"MERCADOS","IZDVAJAMO":"DESTACADOS","REALIZOVANO":"REALIZADO","RAZVOJ SISTEMA":"DESARROLLO DEL SISTEMA",
            "Šta obuhvata":"Qué incluye","izvođenje.":"la ejecución.","Kompletan":"Un portafolio","industrijski portfolio.":"industrial completo.",
            "Skelarski radovi":"Trabajos de andamiaje","Termoizolaterski radovi":"Aislamiento térmico","Limarsko-fasaderski radovi":"Trabajos de chapa y fachada","Bravarsko-zavarivački radovi":"Metalistería y soldadura","Vatrostalno-šamoterski radovi":"Trabajos refractarios","Industrijsko čišćenje":"Limpieza industrial","Visinski alpinistički radovi":"Trabajos verticales","Radionička priprema lima":"Prefabricación de chapa en taller",
            "Termoelektrane":"Centrales térmicas","Spalionice otpada":"Plantas de valorización energética de residuos","Rafinerije nafte":"Refinerías de petróleo","Petrohemija":"Petroquímica","Cementare":"Cementeras","Gradske toplane":"Centrales de calefacción urbana","Drugi industrijski objekti":"Otras instalaciones industriales",
            "Imate projekat koji zahteva pouzdan tim?":"¿Tiene un proyecto que requiere un equipo fiable?","Razgovarajte sa PDV Inženjeringom o obimu radova, rokovima i tehničkim zahtevima.":"Hable con PDV Inženjering sobre el alcance de los trabajos, los plazos y los requisitos técnicos.",
            "© 2026 PDV Inženjering DOO. Sva prava zadržana.":"© 2026 PDV Inženjering DOO. Todos los derechos reservados.","Sva prava zadržana.":"Todos los derechos reservados."
        }
    };


    /* =================================================
       TRANSLATION QUALITY CORRECTIONS / GLOSSARY
       These phrases are deliberately curated because short industrial UI
       copy and technical labels are especially easy for machine translation
       to misread out of context.
    ================================================= */

    const curatedCorrections = {
        mk: {
            "PDV Inženjering DOO. Sva prava zadržana.":"PDV Inženjering DOO. Сите права се задржани.",
            "Licenca":"Лиценца","TELEFON":"ТЕЛЕФОН","EMAIL":"Е-ПОШТА","Website":"Веб-страница",
            "Srbija":"Србија","Nemačka":"Германија","Hrvatska":"Хрватска","Makedonija":"Северна Македонија",
            "Fasada + krov":"Фасада + покрив","Manual + machine":"Рачно + машинско","Full scope":"Целосен обем",
            "Rope access":"Пристап со јаже","Sheet metal + HVAC":"Лим + HVAC","Shotcrete / Torkret":"Прскан бетон / торкрет",
            "Broj zaposlenih":"Вработени","Sertifikata":"Сертификати","Realizovanih projekata":"Реализирани проекти",
            "Pogledajte reference":"Погледнете ги референците","REFERENCE":"РЕФЕРЕНЦИ","REALIZOVANO":"РЕАЛИЗИРАНО"
        },
        en: {
            "PDV Inženjering DOO. Sva prava zadržana.":"PDV Inženjering DOO. All rights reserved.",
            "Licenca":"License","TELEFON":"PHONE","EMAIL":"EMAIL","Website":"Website",
            "Srbija":"Serbia","Nemačka":"Germany","Hrvatska":"Croatia",
            "Fasada + krov":"Facade + roof","Manual + machine":"Manual + machine","Full scope":"Full scope",
            "Rope access":"Rope access","Sheet metal + HVAC":"Sheet metal + HVAC","Shotcrete / Torkret":"Shotcrete / guniting",
            "REALIZOVANO":"COMPLETED"
        },
        de: {
            "PDV Inženjering DOO. Sva prava zadržana.":"PDV Inženjering DOO. Alle Rechte vorbehalten.",
            "Licenca":"Lizenz","TELEFON":"TELEFON","EMAIL":"E-MAIL","Website":"Website",
            "Srbija":"Serbien","Nemačka":"Deutschland","Hrvatska":"Kroatien",
            "Fasada + krov":"Fassade + Dach","Manual + machine":"Manuell + maschinell","Full scope":"Gesamtumfang",
            "Rope access":"Seilzugang","Sheet metal + HVAC":"Blech + HLK","Shotcrete / Torkret":"Spritzbeton / Torkret",
            "dugog veka.":"von Dauer.","Partnerstvo dugog veka.":"Partnerschaft von Dauer.","REALIZOVANO":"ABGESCHLOSSEN"
        },
        fr: {
            "PDV Inženjering DOO. Sva prava zadržana.":"PDV Inženjering DOO. Tous droits réservés.",
            "Licenca":"Licence","TELEFON":"TÉLÉPHONE","EMAIL":"E-MAIL","Website":"Site web",
            "Srbija":"Serbie","Nemačka":"Allemagne","Hrvatska":"Croatie",
            "Fasada + krov":"Façade + toiture","Manual + machine":"Manuel + mécanisé","Full scope":"Périmètre complet",
            "Rope access":"Accès sur cordes","Sheet metal + HVAC":"Tôlerie + CVC","Shotcrete / Torkret":"Béton projeté / Torkret",
            "Iskustvo u":"Expérience dans le secteur","industriji.":"industriel.","REALIZOVANO":"RÉALISÉ"
        },
        ru: {
            "PDV Inženjering DOO. Sva prava zadržana.":"PDV Inženjering DOO. Все права защищены.",
            "Licenca":"Лицензия","TELEFON":"ТЕЛЕФОН","EMAIL":"ЭЛ. ПОЧТА","Website":"Веб-сайт",
            "Srbija":"Сербия","Nemačka":"Германия","Hrvatska":"Хорватия",
            "Fasada + krov":"Фасад + кровля","Manual + machine":"Ручная + машинная очистка","Full scope":"Полный комплекс",
            "Rope access":"Канатный доступ","Sheet metal + HVAC":"Листовой металл + ОВиК","Shotcrete / Torkret":"Торкрет / набрызг-бетон",
            "Broj zaposlenih":"Сотрудников","Sertifikata":"Сертификатов","Realizovanih projekata":"Реализованных проектов",
            "Pogledajte reference":"Посмотреть проекты","REFERENCE":"РЕАЛИЗОВАННЫЕ ПРОЕКТЫ",
            "Limarsko-fasaderski radovi":"Работы с листовым металлом и фасадами",
            "Reference koje":"Проекты, которые","govore.":"говорят сами за себя.","REALIZOVANO":"ВЫПОЛНЕНО"
        },
        hr: {
            "PDV Inženjering DOO. Sva prava zadržana.":"PDV Inženjering DOO. Sva prava pridržana.",
            "Licenca":"Licenca","TELEFON":"TELEFON","EMAIL":"E-MAIL","Website":"Web-stranica",
            "Srbija":"Srbija","Nemačka":"Njemačka","Hrvatska":"Hrvatska",
            "Fasada + krov":"Fasada + krov","Manual + machine":"Ručno + strojno","Full scope":"Cjelovit opseg",
            "Rope access":"Pristup užetom","Sheet metal + HVAC":"Lim + HVAC","Shotcrete / Torkret":"Shotcrete / torkret"
        },
        it: {
            "PDV Inženjering DOO. Sva prava zadržana.":"PDV Inženjering DOO. Tutti i diritti riservati.",
            "Licenca":"Licenza","TELEFON":"TELEFONO","EMAIL":"E-MAIL","Website":"Sito web",
            "Srbija":"Serbia","Nemačka":"Germania","Hrvatska":"Croazia",
            "Fasada + krov":"Facciata + copertura","Manual + machine":"Manuale + meccanizzato","Full scope":"Ambito completo",
            "Rope access":"Accesso su fune","Sheet metal + HVAC":"Lamiera + HVAC","Shotcrete / Torkret":"Calcestruzzo proiettato / torkret",
            "Iskustvo u":"Esperienza nel settore","industriji.":"industriale."
        },
        pl: {
            "PDV Inženjering DOO. Sva prava zadržana.":"PDV Inženjering DOO. Wszelkie prawa zastrzeżone.",
            "Licenca":"Licencja","TELEFON":"TELEFON","EMAIL":"E-MAIL","Website":"Strona internetowa",
            "Srbija":"Serbia","Nemačka":"Niemcy","Hrvatska":"Chorwacja",
            "Fasada + krov":"Elewacja + dach","Manual + machine":"Ręczne + maszynowe","Full scope":"Pełny zakres",
            "Rope access":"Dostęp linowy","Sheet metal + HVAC":"Blacha + HVAC","Shotcrete / Torkret":"Beton natryskowy / torkret",
            "Sertifikata":"Certyfikatów","Realizovanih projekata":"Zrealizowanych projektów"
        },
        "zh-CN": {
            "PDV Inženjering DOO. Sva prava zadržana.":"PDV Inženjering DOO. 保留所有权利。",
            "Licenca":"资质许可","TELEFON":"电话","EMAIL":"电子邮箱","Website":"网站",
            "Srbija":"塞尔维亚","Nemačka":"德国","Hrvatska":"克罗地亚",
            "Fasada + krov":"外墙 + 屋面","Manual + machine":"人工 + 机械","Full scope":"全流程",
            "Rope access":"绳索作业","Sheet metal + HVAC":"钣金 + HVAC","Shotcrete / Torkret":"喷射混凝土 / Torkret"
        },
        es: {
            "PDV Inženjering DOO. Sva prava zadržana.":"PDV Inženjering DOO. Todos los derechos reservados.",
            "Licenca":"Licencia","TELEFON":"TELÉFONO","EMAIL":"CORREO ELECTRÓNICO","Website":"Sitio web",
            "Srbija":"Serbia","Nemačka":"Alemania","Hrvatska":"Croacia",
            "Fasada + krov":"Fachada + cubierta","Manual + machine":"Manual + mecanizado","Full scope":"Alcance completo",
            "Rope access":"Acceso por cuerdas","Sheet metal + HVAC":"Chapa + HVAC","Shotcrete / Torkret":"Hormigón proyectado / torkret"
        }
    };

    Object.entries(curatedCorrections).forEach(([languageCode, corrections]) => {
        if (curatedTranslations[languageCode]) {
            Object.assign(curatedTranslations[languageCode], corrections);
        }
    });

    const normalizeCuratedText = value =>
        String(value || "").replace(/\s+/g, " ").trim();

    const replaceTextKeepingWhitespace = (node, replacement) => {
        const original = node.nodeValue || "";
        const leading = (original.match(/^\s*/) || [""])[0];
        const trailing = (original.match(/\s*$/) || [""])[0];
        node.nodeValue = `${leading}${replacement}${trailing}`;
    };

    const curatedAttributes = {
        mk: { name:"Вашето име", company:"Име на компанијата", message:"Накратко опишете го вашиот проект или барање...", menu:"Отвори мени", language:"Изберете јазик" },
        en: { name:"Your name", company:"Company name", message:"Briefly describe your project or inquiry...", menu:"Open menu", language:"Select language" },
        de: { name:"Ihr Name", company:"Firmenname", message:"Beschreiben Sie kurz Ihr Projekt oder Ihre Anfrage...", menu:"Menü öffnen", language:"Sprache auswählen" },
        fr: { name:"Votre nom", company:"Nom de l’entreprise", message:"Décrivez brièvement votre projet ou votre demande...", menu:"Ouvrir le menu", language:"Choisir la langue" },
        ru: { name:"Ваше имя", company:"Название компании", message:"Кратко опишите ваш проект или запрос...", menu:"Открыть меню", language:"Выбрать язык" },
        hr: { name:"Vaše ime", company:"Naziv tvrtke", message:"Ukratko opišite svoj projekt ili upit...", menu:"Otvori izbornik", language:"Odaberite jezik" },
        it: { name:"Il tuo nome", company:"Nome dell’azienda", message:"Descrivi brevemente il tuo progetto o la tua richiesta...", menu:"Apri menu", language:"Seleziona lingua" },
        pl: { name:"Twoje imię", company:"Nazwa firmy", message:"Krótko opisz swój projekt lub zapytanie...", menu:"Otwórz menu", language:"Wybierz język" },
        "zh-CN": { name:"您的姓名", company:"公司名称", message:"请简要描述您的项目或需求...", menu:"打开菜单", language:"选择语言" },
        es: { name:"Su nombre", company:"Nombre de la empresa", message:"Describa brevemente su proyecto o consulta...", menu:"Abrir menú", language:"Seleccionar idioma" }
    };

    const applyCuratedAttributes = languageCode => {
        if (languageCode === "sr") return;
        const copy = curatedAttributes[languageCode];
        if (!copy) return;

        const nameInput = document.querySelector('.contact-form input[name="name"]');
        const companyInput = document.querySelector('.contact-form input[name="company"]');
        const messageInput = document.querySelector('.contact-form textarea[name="message"]');
        const menuToggle = document.querySelector('.menu-toggle');
        const languageButton = document.querySelector('.language-button');

        if (nameInput) nameInput.placeholder = copy.name;
        if (companyInput) companyInput.placeholder = copy.company;
        if (messageInput) messageInput.placeholder = copy.message;
        if (menuToggle) menuToggle.setAttribute("aria-label", copy.menu);
        if (languageButton) languageButton.setAttribute("aria-label", copy.language);
    };

    const applyCuratedTranslations = languageCode => {
        if (languageCode === "sr") return;

        const translations = curatedTranslations[languageCode];
        if (!translations) return;

        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode(node) {
                    const parent = node.parentElement;
                    if (!parent) return NodeFilter.FILTER_REJECT;
                    if (["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA"].includes(parent.tagName)) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    const key = normalizeCuratedText(node.nodeValue);
                    return translations[key]
                        ? NodeFilter.FILTER_ACCEPT
                        : NodeFilter.FILTER_REJECT;
                }
            }
        );

        const nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);

        nodes.forEach(node => {
            const key = normalizeCuratedText(node.nodeValue);
            replaceTextKeepingWhitespace(node, translations[key]);
            node.parentElement.classList.add("notranslate", "pdv-curated-translation");
        });
    };


    const getCookieLanguage = () => {
        const match = document.cookie.match(/(?:^|;\s*)googtrans=\/sr\/([^;]+)/);
        return match ? decodeURIComponent(match[1]) : null;
    };

    const getCurrentLanguage = () => {
        const saved = localStorage.getItem(storageKey);
        const cookieLanguage = getCookieLanguage();
        const value = saved || cookieLanguage || "sr";
        return languages.some(language => language.code === value) ? value : "sr";
    };

    const clearTranslateCookie = () => {
        const expires = "Thu, 01 Jan 1970 00:00:00 GMT";
        const hostname = window.location.hostname;

        // Clear the host-only cookie.
        document.cookie = `googtrans=;path=/;expires=${expires};SameSite=Lax`;

        // Clear possible domain variants left by Google Translate.
        if (hostname && hostname !== "localhost") {
            document.cookie = `googtrans=;path=/;domain=${hostname};expires=${expires};SameSite=Lax`;
            document.cookie = `googtrans=;path=/;domain=.${hostname};expires=${expires};SameSite=Lax`;

            const parts = hostname.split(".");
            if (parts.length > 2) {
                const rootDomain = parts.slice(-2).join(".");
                document.cookie = `googtrans=;path=/;domain=.${rootDomain};expires=${expires};SameSite=Lax`;
            }
        }
    };

    const setTranslateCookie = languageCode => {
        // Serbian is the original site language. Never run it through
        // machine translation because Google may switch it to Cyrillic
        // or rewrite already-correct Serbian wording.
        if (languageCode === "sr") {
            clearTranslateCookie();
            return;
        }

        const value = `/sr/${languageCode}`;
        document.cookie = `googtrans=${value};path=/;SameSite=Lax`;

        // On normal domains Google Translate can also read the domain cookie.
        if (
            window.location.hostname &&
            window.location.hostname !== "localhost" &&
            window.location.hostname.includes(".")
        ) {
            document.cookie = `googtrans=${value};path=/;domain=.${window.location.hostname};SameSite=Lax`;
        }
    };

    const markNoTranslate = element => {
        if (!element) return;
        element.classList.add("notranslate");
        element.setAttribute("translate", "no");
    };

    const protectBranding = () => {
        document
            .querySelectorAll(
                ".logo, .loader-logo, .mark-center, .engineering-mark, .tech-label, .about-stamp, [data-counter], .certificate-tags, .site-header, .mobile-menu, footer, .hero-stats, .company-numbers, .contact-form"
            )
            .forEach(markNoTranslate);
    };

    const protectTechnicalContent = () => {
        // Official project/reference names must never be machine-translated.
        // For example, "TE Morava" must stay TE Morava rather than being
        // interpreted as ordinary Serbian words by the translator.
        document.querySelectorAll(
            ".reference-group-top h3, .reference-group-top > span, .sub-hero-code, .license-icon, .license-box strong, .certificate-card strong, .reference-corner, .dimension, .about-coordinate"
        ).forEach(markNoTranslate);

        // Timeline values are protected only when they are years, codes or
        // proper project names. Words such as 'Razvoj' and 'Region' can still
        // be translated normally.
        document.querySelectorAll(".timeline-year").forEach(element => {
            const value = normalizeCuratedText(element.textContent);
            if (/^(?:\d{4}(?:\s*[–→-]\s*\d{4})?|I052M1|Kostolac B)$/i.test(value)) {
                markNoTranslate(element);
            }
        });

        // Protect standalone technical identifiers, measurements and codes.
        const technicalPattern = /^(?:I|I052M1|ISO\s*\d[\w.-]*|EN\s*\d[\w.-]*|OHSAS\s*\d[\w.-]*|PDV\s*\/.*|MIG\s*\/\s*MAG\s*\/\s*TIG\s*\/\s*REL|[≈~]?\s*[\d.,]+\s*(?:m²|MW|%|\+)?|\d{4}(?:\s*[–→-]\s*\d{4})?)$/i;

        document.querySelectorAll("strong, span, div, a").forEach(element => {
            if (element.children.length) return;
            const value = normalizeCuratedText(element.textContent);
            if (technicalPattern.test(value)) markNoTranslate(element);
        });

        document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]').forEach(markNoTranslate);
    };


    const protectInlineTechnicalTerms = () => {
        const literalTerms = [
            "PDV INŽENJERING KRAPINA DOO",
            "PDV INŽENJERING DOO",
            "PDV Inženjering DOO",
            "PDV Inženjering",
            "TE Nikola Tesla A",
            "TE Nikola Tesla B",
            "Rafinerija nafte Pančevo",
            "Novi Beograd – Sirius",
            "KO Brzan – Moravište",
            "TE Kostolac A",
            "TE Kostolac B",
            "Cementara Popovac",
            "TENT A – ODG",
            "TE Kolubara",
            "TE Morava",
            "I052M1",
            "CMEC",
            "NEPC2",
            "Layher"
        ].sort((a, b) => b.length - a.length);

        const escapedTerms = literalTerms.map(term =>
            term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        );

        const technicalCodePattern =
            "(?:ISO\\s*\\d{4}(?:-\\d)?|EN\\s*\\d{4}(?:-\\d)?|OHSAS\\s*\\d{4,5}|" +
            "MIG|MAG|TIG|REL|ODG|HVAC|\\d+(?:[.,]\\d+)?\\s*(?:MW|m²))";

        const matcher = new RegExp(
            `(${escapedTerms.join("|")}|${technicalCodePattern})`,
            "g"
        );

        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode(node) {
                    const parent = node.parentElement;
                    if (!parent) return NodeFilter.FILTER_REJECT;
                    if (["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA"].includes(parent.tagName)) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    if (parent.closest(".notranslate, [translate='no']")) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    matcher.lastIndex = 0;
                    return matcher.test(node.nodeValue || "")
                        ? NodeFilter.FILTER_ACCEPT
                        : NodeFilter.FILTER_REJECT;
                }
            }
        );

        const nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);

        nodes.forEach(node => {
            const text = node.nodeValue || "";
            matcher.lastIndex = 0;
            let match;
            let lastIndex = 0;
            const fragment = document.createDocumentFragment();

            while ((match = matcher.exec(text))) {
                if (match.index > lastIndex) {
                    fragment.appendChild(
                        document.createTextNode(text.slice(lastIndex, match.index))
                    );
                }

                const protectedSpan = document.createElement("span");
                protectedSpan.textContent = match[0];
                markNoTranslate(protectedSpan);
                fragment.appendChild(protectedSpan);
                lastIndex = match.index + match[0].length;
            }

            if (lastIndex < text.length) {
                fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
            }

            if (node.parentNode) node.parentNode.replaceChild(fragment, node);
        });
    };

    const addGoogleTranslateContainer = () => {
        if (document.getElementById("google_translate_element")) return;

        const container = document.createElement("div");
        container.id = "google_translate_element";
        container.className = "notranslate";
        document.body.appendChild(container);
    };

    const suppressGoogleTranslateUI = () => {
        const selectors = [
            ".goog-te-banner-frame",
            "iframe.goog-te-banner-frame",
            ".goog-te-balloon-frame",
            "#goog-gt-tt",
            ".goog-tooltip",
            ".goog-te-spinner-pos",
            ".VIpgJd-ZVi9od-ORHb",
            ".VIpgJd-ZVi9od-ORHb-OEVmcd",
            "iframe.VIpgJd-ZVi9od-ORHb-OEVmcd",
            ".VIpgJd-ZVi9od-aZ2wEe-wOHMyf",
            "body > .skiptranslate"
        ];

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                // Do not touch our hidden translation engine container.
                if (element.id === "google_translate_element") return;
                if (element.closest && element.closest("#google_translate_element")) return;

                element.style.setProperty("display", "none", "important");
                element.style.setProperty("visibility", "hidden", "important");
                element.style.setProperty("height", "0", "important");
                element.style.setProperty("min-height", "0", "important");
                element.style.setProperty("max-height", "0", "important");
                element.setAttribute("aria-hidden", "true");
            });
        });

        document.documentElement.style.setProperty("top", "0", "important");
        document.documentElement.style.setProperty("margin-top", "0", "important");
        document.body.style.setProperty("top", "0", "important");
        document.body.style.setProperty("margin-top", "0", "important");
    };

    const watchGoogleTranslateUI = () => {
        suppressGoogleTranslateUI();

        const observer = new MutationObserver(() => {
            suppressGoogleTranslateUI();
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["style", "class"]
        });

        // Google can inject the toolbar after its script finishes loading.
        // Keep the observer active; the callback is lightweight and only
        // touches known Google UI selectors.
    };

    const loadGoogleTranslate = () => {
        addGoogleTranslateContainer();
        watchGoogleTranslateUI();

        if (document.querySelector('script[data-pdv-google-translate="true"]')) {
            return;
        }

        window.googleTranslateElementInit = () => {
            if (!window.google || !window.google.translate) return;

            new window.google.translate.TranslateElement(
                {
                    pageLanguage: "sr",
                    includedLanguages: "sr,mk,en,de,fr,ru,hr,it,pl,zh-CN,es",
                    autoDisplay: false,
                    multilanguagePage: true
                },
                "google_translate_element"
            );

            suppressGoogleTranslateUI();
            setTimeout(suppressGoogleTranslateUI, 150);
            setTimeout(suppressGoogleTranslateUI, 700);
            setTimeout(suppressGoogleTranslateUI, 1800);
        };

        const script = document.createElement("script");
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        script.defer = true;
        script.dataset.pdvGoogleTranslate = "true";
        document.head.appendChild(script);
    };

    const createLanguageSwitcher = () => {
        const navbar = document.querySelector(".navbar");
        if (!navbar || navbar.querySelector(".language-switcher")) return;

        const currentLanguage = getCurrentLanguage();
        const current = languages.find(language => language.code === currentLanguage) || languages[0];

        const switcher = document.createElement("div");
        switcher.className = "language-switcher notranslate";

        const button = document.createElement("button");
        button.type = "button";
        button.className = "language-button";
        button.setAttribute("aria-label", "Izaberite jezik");
        button.setAttribute("aria-expanded", "false");

        const label = document.createElement("span");
        label.className = "language-button-label";
        label.textContent = current.short;

        const chevron = document.createElement("span");
        chevron.className = "language-button-chevron";
        chevron.textContent = "⌄";

        button.append(label, chevron);

        const menu = document.createElement("div");
        menu.className = "language-menu";
        menu.setAttribute("role", "menu");

        languages.forEach(language => {
            const option = document.createElement("button");
            option.type = "button";
            option.className = "language-option";
            option.dataset.language = language.code;
            option.setAttribute("role", "menuitem");

            if (language.code === currentLanguage) {
                option.classList.add("active");
            }

            const code = document.createElement("span");
            code.className = "language-code";
            code.textContent = language.short;

            const name = document.createElement("span");
            name.className = "language-name";
            name.textContent = language.name;

            option.append(code, name);

            option.addEventListener("click", () => {
                if (language.code === getCurrentLanguage()) {
                    switcher.classList.remove("open");
                    button.setAttribute("aria-expanded", "false");
                    return;
                }

                localStorage.setItem(storageKey, language.code);
                setTranslateCookie(language.code);
                window.location.reload();
            });

            menu.appendChild(option);
        });

        button.addEventListener("click", event => {
            event.stopPropagation();
            const isOpen = switcher.classList.toggle("open");
            button.setAttribute("aria-expanded", String(isOpen));
        });

        menu.addEventListener("click", event => event.stopPropagation());

        document.addEventListener("click", () => {
            switcher.classList.remove("open");
            button.setAttribute("aria-expanded", "false");
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                switcher.classList.remove("open");
                button.setAttribute("aria-expanded", "false");
            }
        });

        switcher.append(button, menu);

        const menuToggle = navbar.querySelector(".menu-toggle");
        if (menuToggle) {
            navbar.insertBefore(switcher, menuToggle);
        } else {
            navbar.appendChild(switcher);
        }
    };

    const initialiseLanguages = () => {
        protectBranding();
        protectTechnicalContent();
        protectInlineTechnicalTerms();
        createLanguageSwitcher();

        const currentLanguage = getCurrentLanguage();
        document.documentElement.setAttribute(
            "lang",
            currentLanguage === "zh-CN" ? "zh-CN" : currentLanguage
        );
        document.documentElement.dataset.pdvLanguage = currentLanguage;
        document.documentElement.classList.toggle(
            "pdv-foreign-language",
            currentLanguage !== "sr"
        );

        // Apply professionally curated translations to short UI copy before
        // Google Translate sees the page. These nodes are then marked
        // notranslate so their grammar and terminology cannot be changed.
        applyCuratedTranslations(currentLanguage);
        applyCuratedAttributes(currentLanguage);

        // Serbian is the original Latin-script source. Remove any old
        // Google translation state and do not load the translator at all.
        if (currentLanguage === "sr") {
            clearTranslateCookie();
            document.documentElement.setAttribute("lang", "sr-Latn");
            return;
        }

        // Keep the Google cookie synchronized only for foreign languages.
        if (getCookieLanguage() !== currentLanguage) {
            setTranslateCookie(currentLanguage);
        }

        loadGoogleTranslate();
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialiseLanguages);
    } else {
        initialiseLanguages();
    }
})();
