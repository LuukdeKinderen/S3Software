package nl.luukdekinderen.rankingquestions.resources;

import nl.luukdekinderen.rankingquestions.models.Question;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/question")
public class QuestionResource {

    Question question = new Question(
            "69",
            "Wie is de gezelligste speler",
            "omdat jij de gezelligste bent, mag je",
            "ook al bent je niet de allergezelligste, toch moet je",
            "jammer hoor, twee mensen zijn gewoon gezelliger... doe jij maar",
            "samen aan de top! jullie mogen samen",
            "het is niet bepaald te vieren, snel"
    );

    @RequestMapping("/{questionId}")
    public Question getQuestion(@PathVariable("questionId") String questionId) {
        question.setQuestionId(questionId);
        return question;
    }

    @RequestMapping("/{questionId}/{annotationLevel}")
    public String getQuestionAnnotation(@PathVariable("questionId") String questionId, @PathVariable("annotationLevel") String annotationLevel) {
        question.setQuestionId(questionId);
        String annotation;
        switch (annotationLevel) {
            case "1":
                annotation = question.getFirstPersAnnotation();
                break;
            case "2":
                annotation = question.getSecondPersAnnotation();
                break;
            case "3":
                annotation = question.getThirthPersAnnotation();
                break;
            case "top":
                annotation = question.getTopThreeAnnotation();
                break;
            case "bottom":
                annotation = question.getBottomAnnotation();
                break;
            default:
                annotation = question.getFirstPersAnnotation();
                break;
        }
        return annotation;
    }
}



