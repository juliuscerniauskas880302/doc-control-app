import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";

let data = [
  {
    fullName: "Julius Černiauskas",
    photoPath: "/image/julius.jpg",
    description: "Kokia nors kieta fraze arba ne...",
    socialMedia: [
      {
        icon: "facebook square",
        address: "https://www.facebook.com/Hoperis"
      }
    ]
  },
  {
    fullName: "Jonas Gaidukevičius",
    photoPath: "/image/jonas.jpg",
    description: "Kokia nors kieta fraze arba ne...",
    socialMedia: [
      {
        icon: "facebook square",
        address: "https://www.facebook.com/profile.php?id=100012468660467"
      },
      {
        icon: "linkedin",
        address: "https://lt.linkedin.com/in/jonas-gaidukevicius-57ab08181"
      }
    ]
  },
  {
    fullName: "Miglė Babickaitė",
    photoPath: "/image/migle.jpg",
    description: "Kokia nors kieta fraze arba ne...",
    socialMedia: [
      {
        icon: "facebook square",
        address: "https://www.facebook.com/migle.babickaite"
      }
    ]
  },
  {
    fullName: "Andrius Olišauskas ",
    photoPath: "/image/andrius.jpeg",
    description: "Kokia nors kieta fraze arba ne...",
    socialMedia: [
      {
        icon: "linkedin",
        address: "https://lt.linkedin.com/in/andrius-oli%C5%A1auskas"
      }
    ]
  },
  {
    fullName: "Vytautas Mickevičius",
    photoPath: "/image/vytautas.jpg",
    description: "Kokia nors kieta fraze arba ne...",
    socialMedia: [
      {
        icon: "facebook square",
        address: "https://www.facebook.com/vytautas.mickevicius.5"
      }
    ]
  }
];

let buildData = () => {
  let randomisedData = data.sort(() => Math.random() - 0.5);
  let l = randomisedData.map(data => {
    let socialMedia = data.socialMedia.map(media => {
      return (
        <a href={media.address}>
          <Icon name={media.icon} />
        </a>
      );
    });
    return (
      <Card>
        <Image src={data.photoPath} />
        <Card.Content>
          <Card.Header>{data.fullName}</Card.Header>
          <Card.Meta>
            <span className="date">Prisijungė 2019</span>
          </Card.Meta>
          <Card.Description>{data.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>{socialMedia}</Card.Content>
      </Card>
    );
  });
  return l;
};

export default function About() {
  return (
    <div className="page-holder w-100 d-flex flex-wrap">
      <div className="container-fluid px-xl-5">
        <section className="pt-5">
          <div className="col-lg-12 mb-5">
            <div className="card">
              <div className="card-header">
                <h3 className="h6 text-uppercase mb-0">Apie</h3>
              </div>

              <section class="my-2 px-5 pb-5">
                <h2 class="h1-responsive font-weight-bold text-center my-5">
                  Kodėl rinktis mus?
                </h2>

                <p class="lead grey-text text-center w-responsive mx-auto mb-5">
                  Dokumentų valdymo sistema buvo sukurta Akademija.it studentų
                  komandos "Wizards", naudojant šiuolaikines technologijas.
                </p>

                <div class="row">
                  <div class="col-md-4">
                    <div class="row mb-3">
                      <div class="col-2">
                        <i class="fas fa-2x fa-shield-alt blue" />
                      </div>

                      <div class="col-10">
                        <h5 class="font-weight-bold mb-3">Saugi</h5>
                        <p class="grey-text">
                          Saugumu rūpinasi "Spring Srcurity" karkasas, kuris
                          užtikrina vartotojų autorizaciją ir autentifikaciją.
                        </p>
                      </div>
                    </div>

                    <div class="row mb-md-0 mb-3">
                      <div class="col-2">
                        <i class="fas fa-2x fa-glass-martini blue" />
                      </div>

                      <div class="col-10">
                        <h5 class="font-weight-bold mb-3">Paprasta</h5>
                        <p class="grey-text mb-md-0">
                          Sistema lengva naudotis, nes pasirinktas
                          minimalistinis dizainas, kuris neklaidina vartotojo ir
                          lengva suprasti.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-4 text-center">
                    <img alt="" class="img-fluid" src="/image/logo.png" />
                  </div>

                  <div class="col-md-4">
                    <div class="row mb-3">
                      <div class="col-2">
                        <i class="far fa-2x fa-file-code blue" />
                      </div>

                      <div class="col-10">
                        <h5 class="font-weight-bold mb-3">Atviro kodo</h5>
                        <p class="grey-text">
                          Sistema yra atviro kodo ir prieinama visiems,
                          norintiems išmokti daugiau.
                          <a
                            className="px-2"
                            href="https://github.com/juliuscerniauskas880302/doc-control-app"
                          >
                            Github
                          </a>
                        </p>
                      </div>
                    </div>

                    <div class="row mb-3">
                      <div class="col-2">
                        <i class="fas fa-2x fa-bolt blue" />
                      </div>

                      <div class="col-10">
                        <h5 class="font-weight-bold mb-3">Greita</h5>
                        <p class="grey-text">
                          Programos kodas optimizuotas, kad būtų galima dirbti
                          su dideliais duomenų kiekiais.
                        </p>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-2">
                        <i class="fas fa-2x fa-magic blue" />
                      </div>

                      <div class="col-10">
                        <h5 class="font-weight-bold mb-3">Interaktyvi</h5>
                        <p class="grey-text mb-0">
                          Sistemos interaktyvumą užtikrina "Bootstrap 4" bei
                          "Semantic-ui" bibliotekos.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
