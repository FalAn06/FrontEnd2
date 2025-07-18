import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css';

const Products = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('botellones');

  // Datos simulados de productos, ahora con una imagen URL
  const products = {
    botellones: [
      {
        name: 'Botellón de 5L',
        description: 'Ideal para familias grandes',
        price: '$10',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/botellones/botellon5litros.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLWVhc3QtMSJGMEQCICuXf9In%2BD4L0R%2BZPAm%2B7MpvOjxcAguCIjEwTJOm2vM2AiB1lbr7Ov3Eu7v0PNy%2FB%2BgBv8t5I6t4rijMPlfActEZdyrkAwiS%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDg3NDY3NjU0ODI1MCIM52XjJ67dVCbeWOitKrgD0lESR%2FKCFjxi6iUuTD2MrrrHiqvtkNZpZbTFS7M4l7JNPYTTE%2FIaHE03lIvYehb%2FUNthQrX%2BHXFJ9GCvFrH0RGO3MEF2QGAR2plO2J5cm77bFoyOM1PMXsJHhkyEucIMUO6GAqeRi6xr3pmyFDGA41WUEX3S7oqtkp5esPuQ%2F1oXMUcOy%2FyncJsxLfhs%2B4B%2BUYNp2o9fR37TTgSuJ%2BWZQuH7DNXCYhd28nBOtJ6Z0iBkhZdCpHx3gWS65xOSsEpf9Mw7yrbHppul0xL3IVNhIBeGjW6Kru%2FX5YT7%2BZyY9WqCcurY3Au%2BcSL0gCl3n1bQBo9FXNEVQyrdzPTbftTttRcwHbq0rNvfD1acHUGLuHSPObnkh9l%2Ftt6b26S9zPXAc1fp%2FI%2FP0brNFtvsU3i8CNkPdxj7BZ8LrZSurVG%2FZqF9tMRWtf%2BfegvHtqC69VbitTOu7mPlbDnQrtaVc%2FoVhbuLc99kP8an5nn6oOwwjqVR8ogDOKf0hRZxmhdVfOxoSvfD2NUWHsWEpjIROIHoN67IaaOBRpzXPJDJDCCf5%2FAAPkS4O4%2BzNy7Wsv2TauQxU41kVBqQz7MwzOrpwwY6uAK8TS7ACMHZpEiBoKJFfPzMjp8SUYTcDa%2FGCwElBoQX1Pu3%2Fl2pawb8QnSI1MbnF1bm9H5tJpmzNrgFpsIrEy0jN0q6AanQmUQL1pP7Ed7rbgbjI32C%2BXLiCfzhVugpZWGQKBGlFr1yKWlLj%2Ftg68OIiPVnNT8kZt6uDiLHQXlCTO%2Bsf8ofUNNeblJqqAQXllx%2FIg1h%2BZX9zs8YrAefaCbK3VltkFTGevIUOv8udfUR7YgPbCC4e0Rs8LpCY34t7adfNcX6b%2FlopiNTQO2QFg%2BQpzjU2J2M5SVe2BdjtShhkV%2F2wwJojjZ3ODBgrp%2BHYo57sNGo%2BAipotqxbeFuMpYCxqeB3CpFmnVBTXg07E4M4E4VPimKrTfsspIFzbCLgg2lP%2Fuhyx%2FLsQqe7IL2vug0%2Fj8LxRj2nls%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4XJWI6KNE6HVWMZD%2F20250718%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250718T163316Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=6ef7c9afe8be907dbc1d5bb67f162bd8f93e24ca6d8ef863ab7f437501ae588e',
      },
      {
        name: 'Botellón de 10L',
        description: 'Botellón grande para oficinas',
        price: '$18',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/botellones/botellon10.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA4XJWI6KNFXWQ5SUT%2F20250718%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250718T163055Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLWVhc3QtMSJHMEUCIQCDlL9zC8VTFxMHp0kqAaQx55K9KYIDiKcJTLGGqEvNeAIgexzqCzVhjghkBFiDhOuxidknrNwzmTqeyCKm9UpwlG8qhAMIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw4NzQ2NzY1NDgyNTAiDNw65fg%2BxAPTRbaEASrYAoPs%2FG0YFB21ktn6tv5pdo%2FpPigsxPtD4yOpJrUscecqcwecxZRTXKXi6nciYUax0j35dhHdbpdyhA88NcMfRvcLGO7oOyBSfXJlNbCAS63LqM81tb6%2BCEChz2hnEjHldZJ6BcHqJAkcklqFm7sPQWIdEgsShwWd1DqGypTduA0WxumNeMHoT9r6HJINQeGH3WrL1YZ%2Fi9us%2FkmJpgyiSVQhHscE02iWy2vXFMQZE3fNXYzSVqFYSrzjI%2BTTozdMvtd87JWFPPJ1SrlZ6eCfNAczc0YLnp6eAsCqExa6%2FItdz6Ua7f0QNeyJeO8rj1pO2V0I7dv8A8%2B6IhBNOwvh05kHEEZGluBQH%2Fi7Y1ECJOMgmbw6nh%2F7pbwamqKEtgmH9FOyNbee8tTROdufwuyQFhjurAS9PgUkg5xsSS4iON1phLDyTBl2Cxm0L7Q%2BCN3f1YdX8%2BjC7MKpMMzq6cMGOocCPyxfSKr3Lfemqj%2B%2BAcW53C4FKG%2BA5jXk17kJvsD1THguJxDK%2Fxvy%2Fh6Uj4Oa76aBMpDEv%2BaXFR%2BBsAMJ0L66zSnAlhk8NW18tZ98JJ5WYlWb8bvdHKh4ti0%2BjtJayKsreYkPELHW3Q0dq2563HD%2Ba4yTfrQ0VdnrEp8JUcSxnD7pku5bYC4SxORWWgOzB%2Boqlm4nnoZGg%2Bd8TmI85STcLFa5HPTGVCoHbyxV9WRqnb0q71dFjyktnGvRajCGmnhnMCJD6i2SxHBRoIEBorLwpa7kqFQ%2BJ64IV3vYlzdZGrZH83OKNlntm8EeCK6FA5MLXtJ9Exwp3Fl5ygd49M%2F8Nhza0RZ9g78%3D&X-Amz-Signature=c4be98b391d8197873663090433396fea671e265f6132273d417714a98726b9b&X-Amz-SignedHeaders=host&response-content-disposition=inline',
      },
      {
        name: 'Botellón de 20L',
        description: 'Botellón para uso comercial',
        price: '$30',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/botellones/botellon20.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLWVhc3QtMSJGMEQCICuXf9In%2BD4L0R%2BZPAm%2B7MpvOjxcAguCIjEwTJOm2vM2AiB1lbr7Ov3Eu7v0PNy%2FB%2BgBv8t5I6t4rijMPlfActEZdyrkAwiS%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDg3NDY3NjU0ODI1MCIM52XjJ67dVCbeWOitKrgD0lESR%2FKCFjxi6iUuTD2MrrrHiqvtkNZpZbTFS7M4l7JNPYTTE%2FIaHE03lIvYehb%2FUNthQrX%2BHXFJ9GCvFrH0RGO3MEF2QGAR2plO2J5cm77bFoyOM1PMXsJHhkyEucIMUO6GAqeRi6xr3pmyFDGA41WUEX3S7oqtkp5esPuQ%2F1oXMUcOy%2FyncJsxLfhs%2B4B%2BUYNp2o9fR37TTgSuJ%2BWZQuH7DNXCYhd28nBOtJ6Z0iBkhZdCpHx3gWS65xOSsEpf9Mw7yrbHppul0xL3IVNhIBeGjW6Kru%2FX5YT7%2BZyY9WqCcurY3Au%2BcSL0gCl3n1bQBo9FXNEVQyrdzPTbftTttRcwHbq0rNvfD1acHUGLuHSPObnkh9l%2Ftt6b26S9zPXAc1fp%2FI%2FP0brNFtvsU3i8CNkPdxj7BZ8LrZSurVG%2FZqF9tMRWtf%2BfegvHtqC69VbitTOu7mPlbDnQrtaVc%2FoVhbuLc99kP8an5nn6oOwwjqVR8ogDOKf0hRZxmhdVfOxoSvfD2NUWHsWEpjIROIHoN67IaaOBRpzXPJDJDCCf5%2FAAPkS4O4%2BzNy7Wsv2TauQxU41kVBqQz7MwzOrpwwY6uAK8TS7ACMHZpEiBoKJFfPzMjp8SUYTcDa%2FGCwElBoQX1Pu3%2Fl2pawb8QnSI1MbnF1bm9H5tJpmzNrgFpsIrEy0jN0q6AanQmUQL1pP7Ed7rbgbjI32C%2BXLiCfzhVugpZWGQKBGlFr1yKWlLj%2Ftg68OIiPVnNT8kZt6uDiLHQXlCTO%2Bsf8ofUNNeblJqqAQXllx%2FIg1h%2BZX9zs8YrAefaCbK3VltkFTGevIUOv8udfUR7YgPbCC4e0Rs8LpCY34t7adfNcX6b%2FlopiNTQO2QFg%2BQpzjU2J2M5SVe2BdjtShhkV%2F2wwJojjZ3ODBgrp%2BHYo57sNGo%2BAipotqxbeFuMpYCxqeB3CpFmnVBTXg07E4M4E4VPimKrTfsspIFzbCLgg2lP%2Fuhyx%2FLsQqe7IL2vug0%2Fj8LxRj2nls%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4XJWI6KNE6HVWMZD%2F20250718%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250718T163242Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=dd825406418a09bd837efadac82a77e0f91289e4a77074a9a5d78544fa57ab5c',
      },
      {
        name: 'Botellón de 7L',
        description: 'Botellón práctico para el hogar',
        price: '$15',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/botellones/botellon7.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLWVhc3QtMSJGMEQCICuXf9In%2BD4L0R%2BZPAm%2B7MpvOjxcAguCIjEwTJOm2vM2AiB1lbr7Ov3Eu7v0PNy%2FB%2BgBv8t5I6t4rijMPlfActEZdyrkAwiS%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDg3NDY3NjU0ODI1MCIM52XjJ67dVCbeWOitKrgD0lESR%2FKCFjxi6iUuTD2MrrrHiqvtkNZpZbTFS7M4l7JNPYTTE%2FIaHE03lIvYehb%2FUNthQrX%2BHXFJ9GCvFrH0RGO3MEF2QGAR2plO2J5cm77bFoyOM1PMXsJHhkyEucIMUO6GAqeRi6xr3pmyFDGA41WUEX3S7oqtkp5esPuQ%2F1oXMUcOy%2FyncJsxLfhs%2B4B%2BUYNp2o9fR37TTgSuJ%2BWZQuH7DNXCYhd28nBOtJ6Z0iBkhZdCpHx3gWS65xOSsEpf9Mw7yrbHppul0xL3IVNhIBeGjW6Kru%2FX5YT7%2BZyY9WqCcurY3Au%2BcSL0gCl3n1bQBo9FXNEVQyrdzPTbftTttRcwHbq0rNvfD1acHUGLuHSPObnkh9l%2Ftt6b26S9zPXAc1fp%2FI%2FP0brNFtvsU3i8CNkPdxj7BZ8LrZSurVG%2FZqF9tMRWtf%2BfegvHtqC69VbitTOu7mPlbDnQrtaVc%2FoVhbuLc99kP8an5nn6oOwwjqVR8ogDOKf0hRZxmhdVfOxoSvfD2NUWHsWEpjIROIHoN67IaaOBRpzXPJDJDCCf5%2FAAPkS4O4%2BzNy7Wsv2TauQxU41kVBqQz7MwzOrpwwY6uAK8TS7ACMHZpEiBoKJFfPzMjp8SUYTcDa%2FGCwElBoQX1Pu3%2Fl2pawb8QnSI1MbnF1bm9H5tJpmzNrgFpsIrEy0jN0q6AanQmUQL1pP7Ed7rbgbjI32C%2BXLiCfzhVugpZWGQKBGlFr1yKWlLj%2Ftg68OIiPVnNT8kZt6uDiLHQXlCTO%2Bsf8ofUNNeblJqqAQXllx%2FIg1h%2BZX9zs8YrAefaCbK3VltkFTGevIUOv8udfUR7YgPbCC4e0Rs8LpCY34t7adfNcX6b%2FlopiNTQO2QFg%2BQpzjU2J2M5SVe2BdjtShhkV%2F2wwJojjZ3ODBgrp%2BHYo57sNGo%2BAipotqxbeFuMpYCxqeB3CpFmnVBTXg07E4M4E4VPimKrTfsspIFzbCLgg2lP%2Fuhyx%2FLsQqe7IL2vug0%2Fj8LxRj2nls%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4XJWI6KNE6HVWMZD%2F20250718%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250718T163344Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=a15dca05061b2260cb491297355d320bc4a3893b661ffd87e71a3d94bd3f4049',
      },
    ],
    valvulas: [
      {
        name: 'Válvula de cierre',
        description: 'Válvula para botellones de agua',
        price: '$5',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/valvulas/valvudecierre.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLWVhc3QtMSJHMEUCIFYbNcqMokzFd2m%2FLpfG3G%2B08xBVq5LuG0nAQ1it5t2pAiEA4jtsHdhZGzru%2F5NlHumvekD%2BvrMdyYhg8Eq%2B4GsZUNQq5AMIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw4NzQ2NzY1NDgyNTAiDIlgTXmEnmWW9Mq3pCq4A%2F%2FQ6T5dy5oeMFOLZqEWPZffbeJWPodZNbGRNz%2BOhJZOXKzd9W78Q4SrjB8weLOi6dCZBxbEABzgVpXzt6wQ8%2F2rezLCtd5E6Y2FvX4%2FYVLXy%2BtX%2F0U9mL2QS4zkXuxNPhdMUiwc%2FZTEq%2BMGCkgPP3EQHxPYjcatyqm33EaN%2FNiIrAotTv8VGjWoXiTQ0W50c9SJmhtG9iVxTAj5G0JXO24T2ALanjetWgLQGh4W7owwBlSprjsRlTvrTkBx%2BURhoDcchWIqOoXZEcwjprxQpDP2btejPZ%2FKoHLyd7gt3PjA5bMS0xlNXkkP2%2B3%2BbTledTac2eza08EV%2FI9XOP7Gz%2FTKvuLQCjIm%2F305aY5rOVJ4Fjk%2BZYa1RkRZtY%2FwAqNQyDpJ7wJFhMwIH0askEx5t5pS192CbJRFkyE3f1TwZVzIGGrg%2FoaE9svBggkYKNKcXjE1vr3D%2FtQv4V6Hn81sIOj4PlYLDmj8FpAm76vk8Fk%2FLSLUR3It6NrbWNoGeif7AxlpUEMgQv1OiujU4bcEkWcMpVqv7byQsRIeSQe37KWB0LehLCdE0HvCOPBLNLfEg7wQ08ThR21yMMzq6cMGOrcCxzrnjW9gfn07Ddvek0YOBwTt3jJMNVzFcvHXOP6MjiDr81ziAH1VQhNSSuOGfQPEODN4LyNy%2FQdvgCMHC6oCZk00NZt4J2tmAcNEUASxzjfUxb818N0Ss%2FDl1yrPOVj9BnEl6h%2BlVPhpinzvC%2FsYR1jbtpsJZMUHFmIiai2CGuVvvj6cXnycF%2BzPZOi3%2Bk1d39w0Df3rvIFBX0KAOmwZTBJ7urLVJHFvgVAKiOs%2B0OnbJUOkvYaznthdk7op4NqsjA0BuQK6CgGU802882vZK4HrnAfWho8Bfei5FP%2FnZaJPRJHMvjhe5xlcE%2FliABuiq4UCNV7HAZpjx%2BqLPLdaQnZDPKxmkrTxIgjWtwFmR1xAiG%2BMHc3As%2B5ItMGLLV5nJ%2FGhtcGvJ%2FbJA%2BJdvNcPeycxtjM21y8%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4XJWI6KNMOD733JR%2F20250718%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250718T164501Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=301eb56e7069a3d37cb28adee82a7d7f6c66d59541e367f443570a659b3653ed',
      },
      {
        name: 'Válvula de seguridad',
        description: 'Para evitar fugas de agua',
        price: '$8',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/valvulas/V%C3%A1lvula%20de%20seguridad.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLWVhc3QtMSJHMEUCIBuXoJZBnHEKsBdiSjc3DpSnZoxqGAe4u3lBXMCNL%2BmTAiEAsJHP666lqB7UYULhDoklRDKpvAchAiXez5UGcxIWyh0q5AMIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw4NzQ2NzY1NDgyNTAiDLxRiwLfnSKZQELnDyq4Azay%2FlQ15EPPrhhP%2FRyGtCCSZcyJkVDv2pwv433DFf5VL9gtaXbKRv0Itpx0mJylY1HKEe8jfMJzaJv27jxK%2B0y%2BCZw2w8KXB9t1EuaFr2umLklrbsBGIDp8ilxDnVBcI%2FtiHSrdINY4bfV2yWTtCG1OR7gC%2FcDvJyM45il9knCkIo13QRRgteD42e8mwjJHHCi25NLvDDuVc8OGLnxpH%2BTo1YQqxbwTMa47uhIT6F3JI3hmqLAXGFNwXn33IhOahuyzgFwh96fP9DkiLng3%2FcjiC4swWJz%2F%2BzFP4G53%2FMHXYjfmBFoPmvAlV0O8HYRKK05fmcs%2F8hZxl3FF%2Fitq9PNz7%2B%2BvDr%2B%2BwOmz0qZfX2TOceuXXMfUhL7FwNtXa2xzhQQvzRKk5l7gXk55IUkglPX7ZhWOlHJWtfLdPEjbYmO%2FNYxSs%2FnUM1LfbbEqkgCY35rkCt83mcRl135ioIVdne83%2FN5I2DcvYSwNDEHqwutyNAcsaUJi8DuW9MmhTnddA6CC8Wk0yPxTXYaoSTg3%2Bt9bNpnXLgYOVEexWGgrxF6A5IfljJs9gs3JqT3Exe1%2FVNyg6UrIhyo8MMzq6cMGOrcCbOd0WT4ZMiZeWKgUtY7wiRzXZtiznevj69JZ0TcU4jMtUEtiiQMa%2B%2BCr84I52BB47K20MRuRno28Ce5HYDSYKg2G0%2BoP1irZ0NQbOuiIu0OW2zEt%2Fwz1SbP9GGzlKs8gQKyXRCKHxjEA%2Fc9ZhtS5Oh3SpK74jNDXbcxqsBNqhi6aeqEXoyr79WQBY0YlFKpSED4DeImmaJ%2BTUJnI7vzJ9RGyasbz%2Fxb25W8r29cJjjDrpUvgPaYaPi%2BhAukvWnN8Ap6TOrmVsnQvAl%2F%2BWTCcr79qwGaa9Omz%2BNfoVqUz6sE0JurIu2xX0uUYEtPfH81MbfYaEyNtxmdvnc%2BkxnIuFLBwfXxkLnw0NwhSmJM3dqJv2cjR8CyQq6Pbw7p14P1eANmg1lzv6GOr8SewxtHcMCs3033c1cA%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4XJWI6KNB6L3ASFL%2F20250718%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250718T164602Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=2910312f85d5580607ee8cd04b817991e334ab85314ae6277eda8211cbd0bca0',
      },
      {
        name: 'Válvula de presión',
        description: 'Regula la presión del agua',
        price: '$12',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/valvulas/V%C3%A1lvula%20de%20presi%C3%B3n.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLWVhc3QtMSJHMEUCIBuXoJZBnHEKsBdiSjc3DpSnZoxqGAe4u3lBXMCNL%2BmTAiEAsJHP666lqB7UYULhDoklRDKpvAchAiXez5UGcxIWyh0q5AMIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw4NzQ2NzY1NDgyNTAiDLxRiwLfnSKZQELnDyq4Azay%2FlQ15EPPrhhP%2FRyGtCCSZcyJkVDv2pwv433DFf5VL9gtaXbKRv0Itpx0mJylY1HKEe8jfMJzaJv27jxK%2B0y%2BCZw2w8KXB9t1EuaFr2umLklrbsBGIDp8ilxDnVBcI%2FtiHSrdINY4bfV2yWTtCG1OR7gC%2FcDvJyM45il9knCkIo13QRRgteD42e8mwjJHHCi25NLvDDuVc8OGLnxpH%2BTo1YQqxbwTMa47uhIT6F3JI3hmqLAXGFNwXn33IhOahuyzgFwh96fP9DkiLng3%2FcjiC4swWJz%2F%2BzFP4G53%2FMHXYjfmBFoPmvAlV0O8HYRKK05fmcs%2F8hZxl3FF%2Fitq9PNz7%2B%2BvDr%2B%2BwOmz0qZfX2TOceuXXMfUhL7FwNtXa2xzhQQvzRKk5l7gXk55IUkglPX7ZhWOlHJWtfLdPEjbYmO%2FNYxSs%2FnUM1LfbbEqkgCY35rkCt83mcRl135ioIVdne83%2FN5I2DcvYSwNDEHqwutyNAcsaUJi8DuW9MmhTnddA6CC8Wk0yPxTXYaoSTg3%2Bt9bNpnXLgYOVEexWGgrxF6A5IfljJs9gs3JqT3Exe1%2FVNyg6UrIhyo8MMzq6cMGOrcCbOd0WT4ZMiZeWKgUtY7wiRzXZtiznevj69JZ0TcU4jMtUEtiiQMa%2B%2BCr84I52BB47K20MRuRno28Ce5HYDSYKg2G0%2BoP1irZ0NQbOuiIu0OW2zEt%2Fwz1SbP9GGzlKs8gQKyXRCKHxjEA%2Fc9ZhtS5Oh3SpK74jNDXbcxqsBNqhi6aeqEXoyr79WQBY0YlFKpSED4DeImmaJ%2BTUJnI7vzJ9RGyasbz%2Fxb25W8r29cJjjDrpUvgPaYaPi%2BhAukvWnN8Ap6TOrmVsnQvAl%2F%2BWTCcr79qwGaa9Omz%2BNfoVqUz6sE0JurIu2xX0uUYEtPfH81MbfYaEyNtxmdvnc%2BkxnIuFLBwfXxkLnw0NwhSmJM3dqJv2cjR8CyQq6Pbw7p14P1eANmg1lzv6GOr8SewxtHcMCs3033c1cA%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4XJWI6KNB6L3ASFL%2F20250718%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250718T164543Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=f158ecf48353243c67a99e625d629a9eac603504d9d90a2f983c6ff0ad06d221',
      },
      {
        name: 'Válvula de drenaje',
        description: 'Ideal para sistemas de filtrado',
        price: '$6',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/valvulas/V%C3%A1lvula%20de%20drenaje.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLWVhc3QtMSJHMEUCIBuXoJZBnHEKsBdiSjc3DpSnZoxqGAe4u3lBXMCNL%2BmTAiEAsJHP666lqB7UYULhDoklRDKpvAchAiXez5UGcxIWyh0q5AMIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw4NzQ2NzY1NDgyNTAiDLxRiwLfnSKZQELnDyq4Azay%2FlQ15EPPrhhP%2FRyGtCCSZcyJkVDv2pwv433DFf5VL9gtaXbKRv0Itpx0mJylY1HKEe8jfMJzaJv27jxK%2B0y%2BCZw2w8KXB9t1EuaFr2umLklrbsBGIDp8ilxDnVBcI%2FtiHSrdINY4bfV2yWTtCG1OR7gC%2FcDvJyM45il9knCkIo13QRRgteD42e8mwjJHHCi25NLvDDuVc8OGLnxpH%2BTo1YQqxbwTMa47uhIT6F3JI3hmqLAXGFNwXn33IhOahuyzgFwh96fP9DkiLng3%2FcjiC4swWJz%2F%2BzFP4G53%2FMHXYjfmBFoPmvAlV0O8HYRKK05fmcs%2F8hZxl3FF%2Fitq9PNz7%2B%2BvDr%2B%2BwOmz0qZfX2TOceuXXMfUhL7FwNtXa2xzhQQvzRKk5l7gXk55IUkglPX7ZhWOlHJWtfLdPEjbYmO%2FNYxSs%2FnUM1LfbbEqkgCY35rkCt83mcRl135ioIVdne83%2FN5I2DcvYSwNDEHqwutyNAcsaUJi8DuW9MmhTnddA6CC8Wk0yPxTXYaoSTg3%2Bt9bNpnXLgYOVEexWGgrxF6A5IfljJs9gs3JqT3Exe1%2FVNyg6UrIhyo8MMzq6cMGOrcCbOd0WT4ZMiZeWKgUtY7wiRzXZtiznevj69JZ0TcU4jMtUEtiiQMa%2B%2BCr84I52BB47K20MRuRno28Ce5HYDSYKg2G0%2BoP1irZ0NQbOuiIu0OW2zEt%2Fwz1SbP9GGzlKs8gQKyXRCKHxjEA%2Fc9ZhtS5Oh3SpK74jNDXbcxqsBNqhi6aeqEXoyr79WQBY0YlFKpSED4DeImmaJ%2BTUJnI7vzJ9RGyasbz%2Fxb25W8r29cJjjDrpUvgPaYaPi%2BhAukvWnN8Ap6TOrmVsnQvAl%2F%2BWTCcr79qwGaa9Omz%2BNfoVqUz6sE0JurIu2xX0uUYEtPfH81MbfYaEyNtxmdvnc%2BkxnIuFLBwfXxkLnw0NwhSmJM3dqJv2cjR8CyQq6Pbw7p14P1eANmg1lzv6GOr8SewxtHcMCs3033c1cA%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4XJWI6KNB6L3ASFL%2F20250718%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250718T164525Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=49b965766fd39fb88a7538a7ab8be30ea2fd7f9b94c044666034cce7fc0679f2',
      },
    ],
    filtros: [
      {
        name: 'Filtro de agua básico',
        description: 'Filtro de agua doméstico',
        price: '$20',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/filtros/Filtro%20de%20agua%20b%C3%A1sico.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLWVhc3QtMSJHMEUCIFYbNcqMokzFd2m%2FLpfG3G%2B08xBVq5LuG0nAQ1it5t2pAiEA4jtsHdhZGzru%2F5NlHumvekD%2BvrMdyYhg8Eq%2B4GsZUNQq5AMIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw4NzQ2NzY1NDgyNTAiDIlgTXmEnmWW9Mq3pCq4A%2F%2FQ6T5dy5oeMFOLZqEWPZffbeJWPodZNbGRNz%2BOhJZOXKzd9W78Q4SrjB8weLOi6dCZBxbEABzgVpXzt6wQ8%2F2rezLCtd5E6Y2FvX4%2FYVLXy%2BtX%2F0U9mL2QS4zkXuxNPhdMUiwc%2FZTEq%2BMGCkgPP3EQHxPYjcatyqm33EaN%2FNiIrAotTv8VGjWoXiTQ0W50c9SJmhtG9iVxTAj5G0JXO24T2ALanjetWgLQGh4W7owwBlSprjsRlTvrTkBx%2BURhoDcchWIqOoXZEcwjprxQpDP2btejPZ%2FKoHLyd7gt3PjA5bMS0xlNXkkP2%2B3%2BbTledTac2eza08EV%2FI9XOP7Gz%2FTKvuLQCjIm%2F305aY5rOVJ4Fjk%2BZYa1RkRZtY%2FwAqNQyDpJ7wJFhMwIH0askEx5t5pS192CbJRFkyE3f1TwZVzIGGrg%2FoaE9svBggkYKNKcXjE1vr3D%2FtQv4V6Hn81sIOj4PlYLDmj8FpAm76vk8Fk%2FLSLUR3It6NrbWNoGeif7AxlpUEMgQv1OiujU4bcEkWcMpVqv7byQsRIeSQe37KWB0LehLCdE0HvCOPBLNLfEg7wQ08ThR21yMMzq6cMGOrcCxzrnjW9gfn07Ddvek0YOBwTt3jJMNVzFcvHXOP6MjiDr81ziAH1VQhNSSuOGfQPEODN4LyNy%2FQdvgCMHC6oCZk00NZt4J2tmAcNEUASxzjfUxb818N0Ss%2FDl1yrPOVj9BnEl6h%2BlVPhpinzvC%2FsYR1jbtpsJZMUHFmIiai2CGuVvvj6cXnycF%2BzPZOi3%2Bk1d39w0Df3rvIFBX0KAOmwZTBJ7urLVJHFvgVAKiOs%2B0OnbJUOkvYaznthdk7op4NqsjA0BuQK6CgGU802882vZK4HrnAfWho8Bfei5FP%2FnZaJPRJHMvjhe5xlcE%2FliABuiq4UCNV7HAZpjx%2BqLPLdaQnZDPKxmkrTxIgjWtwFmR1xAiG%2BMHc3As%2B5ItMGLLV5nJ%2FGhtcGvJ%2FbJA%2BJdvNcPeycxtjM21y8%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4XJWI6KNMOD733JR%2F20250718%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250718T164307Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=a83d1c5cfff4fb7172c38e6b6b7b9ed933c1c0deb59aaa5b78bb17e1dc6932e7',
      },
      {
        name: 'Filtro de agua industrial',
        description: 'Filtrado para grandes cantidades de agua',
        price: '$50',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/filtros/Filtro%20de%20agua%20industrial.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLWVhc3QtMSJHMEUCIFYbNcqMokzFd2m%2FLpfG3G%2B08xBVq5LuG0nAQ1it5t2pAiEA4jtsHdhZGzru%2F5NlHumvekD%2BvrMdyYhg8Eq%2B4GsZUNQq5AMIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw4NzQ2NzY1NDgyNTAiDIlgTXmEnmWW9Mq3pCq4A%2F%2FQ6T5dy5oeMFOLZqEWPZffbeJWPodZNbGRNz%2BOhJZOXKzd9W78Q4SrjB8weLOi6dCZBxbEABzgVpXzt6wQ8%2F2rezLCtd5E6Y2FvX4%2FYVLXy%2BtX%2F0U9mL2QS4zkXuxNPhdMUiwc%2FZTEq%2BMGCkgPP3EQHxPYjcatyqm33EaN%2FNiIrAotTv8VGjWoXiTQ0W50c9SJmhtG9iVxTAj5G0JXO24T2ALanjetWgLQGh4W7owwBlSprjsRlTvrTkBx%2BURhoDcchWIqOoXZEcwjprxQpDP2btejPZ%2FKoHLyd7gt3PjA5bMS0xlNXkkP2%2B3%2BbTledTac2eza08EV%2FI9XOP7Gz%2FTKvuLQCjIm%2F305aY5rOVJ4Fjk%2BZYa1RkRZtY%2FwAqNQyDpJ7wJFhMwIH0askEx5t5pS192CbJRFkyE3f1TwZVzIGGrg%2FoaE9svBggkYKNKcXjE1vr3D%2FtQv4V6Hn81sIOj4PlYLDmj8FpAm76vk8Fk%2FLSLUR3It6NrbWNoGeif7AxlpUEMgQv1OiujU4bcEkWcMpVqv7byQsRIeSQe37KWB0LehLCdE0HvCOPBLNLfEg7wQ08ThR21yMMzq6cMGOrcCxzrnjW9gfn07Ddvek0YOBwTt3jJMNVzFcvHXOP6MjiDr81ziAH1VQhNSSuOGfQPEODN4LyNy%2FQdvgCMHC6oCZk00NZt4J2tmAcNEUASxzjfUxb818N0Ss%2FDl1yrPOVj9BnEl6h%2BlVPhpinzvC%2FsYR1jbtpsJZMUHFmIiai2CGuVvvj6cXnycF%2BzPZOi3%2Bk1d39w0Df3rvIFBX0KAOmwZTBJ7urLVJHFvgVAKiOs%2B0OnbJUOkvYaznthdk7op4NqsjA0BuQK6CgGU802882vZK4HrnAfWho8Bfei5FP%2FnZaJPRJHMvjhe5xlcE%2FliABuiq4UCNV7HAZpjx%2BqLPLdaQnZDPKxmkrTxIgjWtwFmR1xAiG%2BMHc3As%2B5ItMGLLV5nJ%2FGhtcGvJ%2FbJA%2BJdvNcPeycxtjM21y8%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4XJWI6KNMOD733JR%2F20250718%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250718T164333Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=e99f0c7a2de05a4a0c53d9dd9dc6f1b267a34dd65eb5c9c8e684496db54dbe03',
      },
      {
        name: 'Filtro purificador',
        description: 'Purifica el agua eliminando bacterias',
        price: '$35',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/filtros/Filtro%20purificador.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLWVhc3QtMSJHMEUCIFYbNcqMokzFd2m%2FLpfG3G%2B08xBVq5LuG0nAQ1it5t2pAiEA4jtsHdhZGzru%2F5NlHumvekD%2BvrMdyYhg8Eq%2B4GsZUNQq5AMIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw4NzQ2NzY1NDgyNTAiDIlgTXmEnmWW9Mq3pCq4A%2F%2FQ6T5dy5oeMFOLZqEWPZffbeJWPodZNbGRNz%2BOhJZOXKzd9W78Q4SrjB8weLOi6dCZBxbEABzgVpXzt6wQ8%2F2rezLCtd5E6Y2FvX4%2FYVLXy%2BtX%2F0U9mL2QS4zkXuxNPhdMUiwc%2FZTEq%2BMGCkgPP3EQHxPYjcatyqm33EaN%2FNiIrAotTv8VGjWoXiTQ0W50c9SJmhtG9iVxTAj5G0JXO24T2ALanjetWgLQGh4W7owwBlSprjsRlTvrTkBx%2BURhoDcchWIqOoXZEcwjprxQpDP2btejPZ%2FKoHLyd7gt3PjA5bMS0xlNXkkP2%2B3%2BbTledTac2eza08EV%2FI9XOP7Gz%2FTKvuLQCjIm%2F305aY5rOVJ4Fjk%2BZYa1RkRZtY%2FwAqNQyDpJ7wJFhMwIH0askEx5t5pS192CbJRFkyE3f1TwZVzIGGrg%2FoaE9svBggkYKNKcXjE1vr3D%2FtQv4V6Hn81sIOj4PlYLDmj8FpAm76vk8Fk%2FLSLUR3It6NrbWNoGeif7AxlpUEMgQv1OiujU4bcEkWcMpVqv7byQsRIeSQe37KWB0LehLCdE0HvCOPBLNLfEg7wQ08ThR21yMMzq6cMGOrcCxzrnjW9gfn07Ddvek0YOBwTt3jJMNVzFcvHXOP6MjiDr81ziAH1VQhNSSuOGfQPEODN4LyNy%2FQdvgCMHC6oCZk00NZt4J2tmAcNEUASxzjfUxb818N0Ss%2FDl1yrPOVj9BnEl6h%2BlVPhpinzvC%2FsYR1jbtpsJZMUHFmIiai2CGuVvvj6cXnycF%2BzPZOi3%2Bk1d39w0Df3rvIFBX0KAOmwZTBJ7urLVJHFvgVAKiOs%2B0OnbJUOkvYaznthdk7op4NqsjA0BuQK6CgGU802882vZK4HrnAfWho8Bfei5FP%2FnZaJPRJHMvjhe5xlcE%2FliABuiq4UCNV7HAZpjx%2BqLPLdaQnZDPKxmkrTxIgjWtwFmR1xAiG%2BMHc3As%2B5ItMGLLV5nJ%2FGhtcGvJ%2FbJA%2BJdvNcPeycxtjM21y8%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4XJWI6KNMOD733JR%2F20250718%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250718T164419Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=c697eb3566aa210293b2dfe34f8d3746d1e9d3490b5f30492bb0a4e9b2982879',
      },
      {
        name: 'Filtro de carbón activado',
        description: 'Elimina impurezas y malos olores',
        price: '$25',
        imageUrl: 'https://imagenestienda1.s3.us-east-1.amazonaws.com/filtros/Filtro%20de%20carb%C3%B3n%20activado.jpg?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHkaCXVzLWVhc3QtMSJHMEUCIFYbNcqMokzFd2m%2FLpfG3G%2B08xBVq5LuG0nAQ1it5t2pAiEA4jtsHdhZGzru%2F5NlHumvekD%2BvrMdyYhg8Eq%2B4GsZUNQq5AMIkv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw4NzQ2NzY1NDgyNTAiDIlgTXmEnmWW9Mq3pCq4A%2F%2FQ6T5dy5oeMFOLZqEWPZffbeJWPodZNbGRNz%2BOhJZOXKzd9W78Q4SrjB8weLOi6dCZBxbEABzgVpXzt6wQ8%2F2rezLCtd5E6Y2FvX4%2FYVLXy%2BtX%2F0U9mL2QS4zkXuxNPhdMUiwc%2FZTEq%2BMGCkgPP3EQHxPYjcatyqm33EaN%2FNiIrAotTv8VGjWoXiTQ0W50c9SJmhtG9iVxTAj5G0JXO24T2ALanjetWgLQGh4W7owwBlSprjsRlTvrTkBx%2BURhoDcchWIqOoXZEcwjprxQpDP2btejPZ%2FKoHLyd7gt3PjA5bMS0xlNXkkP2%2B3%2BbTledTac2eza08EV%2FI9XOP7Gz%2FTKvuLQCjIm%2F305aY5rOVJ4Fjk%2BZYa1RkRZtY%2FwAqNQyDpJ7wJFhMwIH0askEx5t5pS192CbJRFkyE3f1TwZVzIGGrg%2FoaE9svBggkYKNKcXjE1vr3D%2FtQv4V6Hn81sIOj4PlYLDmj8FpAm76vk8Fk%2FLSLUR3It6NrbWNoGeif7AxlpUEMgQv1OiujU4bcEkWcMpVqv7byQsRIeSQe37KWB0LehLCdE0HvCOPBLNLfEg7wQ08ThR21yMMzq6cMGOrcCxzrnjW9gfn07Ddvek0YOBwTt3jJMNVzFcvHXOP6MjiDr81ziAH1VQhNSSuOGfQPEODN4LyNy%2FQdvgCMHC6oCZk00NZt4J2tmAcNEUASxzjfUxb818N0Ss%2FDl1yrPOVj9BnEl6h%2BlVPhpinzvC%2FsYR1jbtpsJZMUHFmIiai2CGuVvvj6cXnycF%2BzPZOi3%2Bk1d39w0Df3rvIFBX0KAOmwZTBJ7urLVJHFvgVAKiOs%2B0OnbJUOkvYaznthdk7op4NqsjA0BuQK6CgGU802882vZK4HrnAfWho8Bfei5FP%2FnZaJPRJHMvjhe5xlcE%2FliABuiq4UCNV7HAZpjx%2BqLPLdaQnZDPKxmkrTxIgjWtwFmR1xAiG%2BMHc3As%2B5ItMGLLV5nJ%2FGhtcGvJ%2FbJA%2BJdvNcPeycxtjM21y8%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA4XJWI6KNMOD733JR%2F20250718%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250718T164358Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=b7b27a8cee7af1aa25d9ef1cff86c39aed3a8595fb6171858dcb053383bbcd70',
      },
    ],
  };

  // Función para manejar el cambio de categoría
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Función para regresar a la página anterior
  const goBack = () => {
    navigate(-1); // Regresa a la página anterior
  };

  return (
    <div className="products-container">
      {/* Barra de categorías */}
      <div className="category-menu">
        <button onClick={() => handleCategoryChange('botellones')}>Botellones</button>
        <button onClick={() => handleCategoryChange('valvulas')}>Válvulas</button>
        <button onClick={() => handleCategoryChange('filtros')}>Filtros</button>
      </div>

      <h1 className="category-title">
        {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
      </h1>

      {/* Botón de regresar */}
      <button onClick={goBack} className="back-button">
        Regresar
      </button>

      <div className="products-grid">
        {/* Mostrar productos de la categoría seleccionada */}
        {products[selectedCategory].map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="product-price">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
