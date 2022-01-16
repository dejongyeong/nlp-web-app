from django.conf import settings
import joblib
import os
import tensorflow as tf
from transformers import BertTokenizer, TFBertForSequenceClassification

class BertPredictor():
    """
    BERT model for sentiment analysis
    """
    def __init__(self) -> None:
        gpus = tf.config.experimental.list_physical_devices(device_type='GPU')
        tf.config.experimental.set_memory_growth(gpus[0], True)

        self.tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
        self.model = TFBertForSequenceClassification.from_pretrained('bert-base-uncased')

    def predict(self, sentence)->dict:
        model = self.model
        model.load_weights(os.path.join(settings.BASE_DIR, 'model', 'tf_model.h5'))
        tokens = self.tokenizer(sentence, truncation=True, padding=True, return_tensors='tf')
        pred = model(tokens)
        probs = tf.nn.softmax(pred[0], axis=1).numpy()

        # get index of the maximum value as label (0: negative, 1: positive) and use the index
        # to get probability
        label = tf.argmax(probs, axis=1).numpy()[0]
        results = {'pred': label, 'prob': probs[:,label][0]}
        return results


class MNBPredictor():
    """
    Naive Bayes model for sentiment analysis
    """
    def __init__(self) -> None:
        pass

    def predict(self, sentence: str)->dict:
        vector, classifier = joblib.load(os.path.join(settings.BASE_DIR, 'model', 'multinomialnb_no_stopwords.joblib'))
        feature = vector.transform([sentence])  # must be a list

        # predict and calculate probability - it will return 1x2 matrix where:
        # 1st row of predict probability: probability for class 0 negative sentiment
        # 2nd row of predict probability: probability for class 1 positive sentiment
        pred = classifier.predict(feature)
        prob = classifier.predict_proba(feature)

        results = {'pred': pred[0], 'prob': prob[:,pred[0]][0]}
        return results