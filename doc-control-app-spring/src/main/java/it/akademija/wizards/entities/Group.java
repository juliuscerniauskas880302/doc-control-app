package it.akademija.wizards.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.lang.reflect.Type;
import java.util.List;

@Entity
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    private String title;

//    Types that this group can submit
    @ManyToMany
    List <Type> submissionType;

//    Types that this group can review
    @ManyToMany
    List <Type> reviewType;

    public Group() {
    }

    public Group(@NotNull String title, List<Type> submissionType, List<Type> reviewType) {
        this.title = title;
        this.submissionType = submissionType;
        this.reviewType = reviewType;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Type> getSubmissionType() {
        return submissionType;
    }

    public void addSubmissionType (Type type){
        this.submissionType.add(type);
    }
    public void setSubmissionType (List<Type> submissionType) {
        this.submissionType = submissionType;
    }

    public List<Type> getReviewType() {
        return reviewType;
    }

    public void addReviewType (Type type){
        this.submissionType.add(type);
    }

    public void setReviewType(List<Type> reviewType) {
        this.reviewType = reviewType;
    }
}
