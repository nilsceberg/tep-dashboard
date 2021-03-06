# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class Main(Component):
    """A Main component.
Main is the part of the dashboard
that displays all data.

Keyword arguments:

- children (a list of or a singular dash component, string or number; optional):
    Children.

- id (string; optional):
    The ID used to identify this component in Dash callbacks.

- value (string; optional):
    The value displayed in the input."""
    @_explicitize_args
    def __init__(self, children=None, id=Component.UNDEFINED, value=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'id', 'value']
        self._type = 'Main'
        self._namespace = 'tep_dashboard'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'id', 'value']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}
        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(Main, self).__init__(children=children, **args)
