def pageify(*args, **kwargs):
    try: 
        queryset = kwargs['queryset']
        page = kwargs['page']
        items_per_page = kwargs['items_per_page']
    except Exception as e:
        raise KeyError('pageify Missing required arguments',e.args)
    x = items_per_page * page
    y = x - items_per_page
    return queryset[y:x]
        
        
    