package nl.luukdekinderen.rankingquestions.models;

public class Question {
    private String questionId;
    private String question;
    private String firstPersAnnotation;
    private String secondPersAnnotation;
    private String thirthPersAnnotation;
    private String topThreeAnnotation;
    private String bottomAnnotation;

    public Question(String questionId, String question, String firstPersAnnotation, String secondPersAnnotation, String thirthPersAnnotation, String topThreeAnnotation, String bottomAnnotation) {
        this.questionId=questionId;
        this.question = question;
        this.firstPersAnnotation = firstPersAnnotation;
        this.secondPersAnnotation = secondPersAnnotation;
        this.thirthPersAnnotation = thirthPersAnnotation;
        this.topThreeAnnotation = topThreeAnnotation;
        this.bottomAnnotation = bottomAnnotation;
    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getFirstPersAnnotation() {
        return firstPersAnnotation;
    }

    public void setFirstPersAnnotation(String firstPersAnnotation) {
        this.firstPersAnnotation = firstPersAnnotation;
    }

    public String getSecondPersAnnotation() {
        return secondPersAnnotation;
    }

    public void setSecondPersAnnotation(String secondPersAnnotation) {
        this.secondPersAnnotation = secondPersAnnotation;
    }

    public String getThirthPersAnnotation() {
        return thirthPersAnnotation;
    }

    public void setThirthPersAnnotation(String thirthPersAnnotation) {
        this.thirthPersAnnotation = thirthPersAnnotation;
    }

    public String getTopThreeAnnotation() {
        return topThreeAnnotation;
    }

    public void setTopThreeAnnotation(String topThreeAnnotation) {
        this.topThreeAnnotation = topThreeAnnotation;
    }

    public String getBottomAnnotation() {
        return bottomAnnotation;
    }

    public void setBottomAnnotation(String bottomAnnotation) {
        this.bottomAnnotation = bottomAnnotation;
    }
}
