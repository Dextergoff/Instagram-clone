
from center.settings import PAGEIFY


def count_posts(org_qs, paged_qs, items_per_page):
    post_count = 0
    for i in org_qs:
        post_count += 1
    end_of_data = False
    if post_count <= items_per_page:
        end_of_data = True
    return {PAGEIFY['PC_KEY']: post_count, PAGEIFY['EOP_KEY']: end_of_data}


def pageify(queryset, page, items_per_page):
    try:
        y = items_per_page * page
        x = y - items_per_page
        count_response = count_posts(
            org_qs=queryset, paged_qs=queryset[x:y], items_per_page=items_per_page)
        return {"page": queryset[x:y], PAGEIFY['PC_KEY']: count_response[PAGEIFY['PC_KEY']], PAGEIFY['EOP_KEY']: count_response[PAGEIFY['EOP_KEY']]}
    except Exception as e:
        raise KeyError('pageify Error', e.args)
