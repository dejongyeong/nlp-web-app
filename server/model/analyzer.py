from sentimentanalysis.apps import SentimentanalysisConfig


def classify_sentiment(sentence: str, option: str)->dict:
    """
    A method that returns the sentiment of the user-defined sentence for django app.
    Return: the predicted class and the corresponding probability
    """
    if option == 'mnb': 
        return SentimentanalysisConfig.mnb.predict(sentence)

    if option == 'bert':
        return SentimentanalysisConfig.bert.predict(sentence)