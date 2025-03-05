class Product { constructor(id, title, picture, dims, type, rubro, material) { this.id = id; this.title = title; this.picture = picture; this.dims = dims; this.type = type; this.rubro = rubro; this.material = material } }; class ProductComponent { constructor(ProductObject, Component) { this.ProductObject = ProductObject; this.Component = Component } }; function createComponent({ id, typeElemento = "div", clssList = [], txtContent = "", attr = { href: undefined, loading: undefined, width: undefined, height: undefined, src: undefined, allowfullscreen: undefined, alt: undefined } }) { let x = document.createElement(typeElemento); if (clssList.length > 0) x.classList.add(...clssList); if (id) x.id = id; if (txtContent.length > 0) x.textContent = txtContent; if (attr.href) x.setAttribute("href", attr.href); if (attr.loading) x.setAttribute("loading", attr.loading); if (attr.width) x.setAttribute("width", attr.width); if (attr.height) x.setAttribute("height", attr.height); if (attr.src) x.setAttribute("src", attr.src); if (attr.allowfullscreen) x.setAttribute("allowfullscreen", attr.allowfullscreen); if (attr.alt) x.setAttribute("alt", attr.alt); return x }; async function loadDynamicProject() { try { const respuesta = await fetch('/js/products.json'); if (!respuesta.ok) throw new Error('Error al cargar el JSON'); products = await respuesta.json(); loadTarjArray(products) } catch (error) { console.error('Error:', error) } }; function loadTarjArray(products) { products.forEach(e => { productComponent.push(new ProductComponent(e, createProductTarj(e))) }) }; function createProductTarj({ id, title, picture, dims, type, rubro, material }) { const article = createComponent({ typeElemento: "article", clssList: ["servicios"] }); const imgComp = createComponent({ typeElemento: "img", attr: { src: `/img/${picture}`, height: "150px", alt: `Imagen de ilustrativo de '${title}'` } }); const divDescS = createComponent({ typeElemento: "div", clssList: ["desc_service"] }); const divInDescS = createComponent({ typeElemento: "div" }); const divBtns = createComponent({ typeElemento: "div", clssList: ["btns"] }); divBtns.append(createComponent({ typeElemento: "a", txtContent: "Solicitar", attr: { href: "#" }, clssList: ["btn"] })); divInDescS.append(...[createComponent({ typeElemento: "h3", txtContent: title }), createComponent({ typeElemento: "p", txtContent: `Tipo: ${type}.` }), createComponent({ typeElemento: "p", txtContent: `Dims: ${dims}.` }), createComponent({ typeElemento: "p", txtContent: `Material: ${material}.` }), createComponent({ typeElemento: "p", txtContent: `Rubro: ${rubro}.` })]); divDescS.append(divInDescS, divBtns); article.append(imgComp, divDescS); return article }; function findTarjAndLoadProducts({ type = "All", rubro = "All" }) { const rComponents = new Array(); const r = productComponent.filter(e => { if ((e.ProductObject.type == type || type == "All" || e.ProductObject.type == "A Definir") && (e.ProductObject.rubro == rubro || rubro == "All" || e.ProductObject.rubro == "A Definir")) { rComponents.push(e.Component) } }); contenedorProductos.replaceChildren(...rComponents) }; const contenedorProductos = document.querySelector(".contenedor_productos"); let selectProductRubro, selectProductType; let productComponent = new Array(); let products; const filtros = document.getElementById("filtros"); filtros.addEventListener("change", e => { if (e.target.name == "Tipo") { selectProductType = e.target.value } else if (e.target.name == "Rubro") { selectProductRubro = e.target.value }; findTarjAndLoadProducts({ rubro: selectProductRubro, type: selectProductType }) }); loadDynamicProject();