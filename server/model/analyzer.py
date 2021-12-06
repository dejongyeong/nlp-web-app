from django.conf import settings
import joblib
import os
import sklearn.metrics as mtr


def classify_sentiment(sentence: str)->dict:
    """
    A method that returns the sentiment of the user-defined sentence for django app.
    All multinomialnb*.joblib files are saved as follow: [tfidf vectorizer, ml-model]
    """
    vector, classifier = joblib.load(os.path.join(settings.BASE_DIR, 'model', 'multinomialnb_no_stopwords.joblib'))
    feature = vector.transform([sentence])      # must be a list
    
    # predict and calculate probability - it will return 1x2 matrix where:
    # 1st row of predict probability: probability for class 0 negative sentiment
    # 2nd row of predict probability: probability for class 1 positive sentiment
    pred = classifier.predict(feature)
    prob = classifier.predict_proba(feature)
    
    results = {
        'pred': 'Negative' if pred[0] == 0 else "Positive",
        'prob': round((prob[:,pred[0]][0] * 100), 2)
    }
    
    return results        # the predicted class and the corresponding probability