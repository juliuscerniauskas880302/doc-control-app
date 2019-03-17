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
                <h3 className="h6 text-uppercase mb-0">Apie komandą</h3>
              </div>
              <div className="card-body">
                <div className="form-group row">
                  <label className="col-md-12 form-control-label">
                    Kazkoks cia tekstas, kuris turetu prasme arba ne....
                  </label>
                </div>
              </div>
              <Card.Group className="d-flex justify-content-center ml-1 pb-5">
                {buildData()}
              </Card.Group>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
