package it.akademija.wizards.entities;

import it.akademija.wizards.enums.State;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
public class Documents {

    @Id
    @GeneratedValue(generator ="uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @ManyToOne
    private User author;

    private State state;

//    @ManyToOne
//    private Type type;

    @NotNull
    private String title;

    @NotNull
    private String description;

    private Date creationDate;
    private Date submissionDate;
    private Date approvalDate;
    private Date rejectionDate;

    public Documents(User author, State state, @NotNull String title,
                     @NotNull String description, Date creationDate, Date submissionDate, Date approvalDate, Date rejectionDate) {
        this.author = author;
        this.state = state;
        this.title = title;
        this.description = description;
        this.creationDate = creationDate;
        this.submissionDate = submissionDate;
        this.approvalDate = approvalDate;
        this.rejectionDate = rejectionDate;
    }

    public Documents() {
    }


    //
//    @ManyToOne
//    String type
//
//    String title
//
//    String description
//    Date creationDate
//    Date submissionDate [jei pateiktas]
//    Date approvalDate [jei patvirtintas]
//    Date rejectionDate [jei atmestas]
//    @ManyToOne
//    User reviewer [jei patvirtintas arba atmestas]
//    String rejectionReason [jei atmestas]
//    String path (vieną ar daugiau pdf tipo bylų) [jei prisegta]

}
