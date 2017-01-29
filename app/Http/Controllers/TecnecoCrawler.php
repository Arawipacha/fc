<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Requests;
use Symfony\Component\DomCrawler\Crawler;
use Goutte\Client;

use Sunra\PhpSimple\HtmlDomParser;
use GuzzleHttp\Client as GuzzleClient;
class TecnecoCrawler extends Controller
{
    private $client;
    public $url;
    public $crawler;
    public $filters;
    public $content= array();

    public function __construct(){
        $this->client=new Client();
    }
    
    public function getIndex(){

$dom = HtmlDomParser::file_get_html( 'http://www.tecneco.com/index.php?p=get_scheda_filtro&codice=OL07033-E' );
//$html = file_get_html('http://www.google.com/');

// Find all images 
/*$infoFiltro=$dom->find('.info-filtro');
foreach($infoFiltro->find('.text-filtro') as $element) 
       echo $element;
       */
       $filtro;

    
foreach($dom->find('.info-filtro') as $ul) 
{
       foreach($ul->find('.text-filtro') as $li) 
       {
              $label= $li->find('h2','0');
              $value= $li->find('h3','0');
           if($label->plaintext=='Codice Tecneco'){
                     
                     $filtro['codice_tecneco'] = $value->plaintext;
           }
           if($label->plaintext=='Tipo'){
                     $filtro['tipo']= 'Tipo: '.$value->plaintext;
           }
           if($label->plaintext=='Modello'){
                     $filtro['modello']= 'Modello: '.$value->plaintext;
           }
                      
           if($label->plaintext=='Dimension 1 (mm)'){
                     $filtro['dimension1']= 'Dimension 1 (mm): '.$value->plaintext;
           }
           if($label->plaintext=='Dimension 2 (mm)'){
                     $filtro['dimension2']= 'Dimension 2 (mm): '.$value->plaintext;
           }
           if($label->plaintext=='Dimension 3 (mm)'){
                     $filtro['dimension3']= 'Dimension 3 (mm): '.$value->plaintext;
           }
           if($label->plaintext=='Dimension 4 (mm)'){
                     $filtro['dimension4']= 'Dimension 4 (mm): '.$value->plaintext;
           }
           if($label->plaintext=='H1 (mm)'){
                     $filtro['h1']= 'H1 (mm): '.$value->plaintext;
           }
           if($label->plaintext=='H2 (mm)'){
                     $filtro['h2']= 'H2 (mm): '.$value->plaintext;
           }
       }

       foreach ($ul->find('.newstamp') as $li){
             foreach ($li->find('.text-filtro') as $vol){
                $label= $vol->find('h2','0');
                $value= $vol->find('h3','0');
                if($label->plaintext=='Box filtro (mm) '){
                     $filtro['box_filtro']= 'Box filtro (mm): '.$value->plaintext;
                }
                if($label->plaintext=='Volume box (mq) '){
                     $filtro['volumen_box']= 'Volume box (mq): '. $value->plaintext;
                }
                if($label->plaintext=='Peso netto - no box (g)'){
                     $filtro['peso_netto']= 'Peso netto - no box (g): '.$value->plaintext;
                }
                if($label->plaintext=='Peso lordo - in box (g)'){
                     $filtro['peso_lordo']= 'Peso lordo - in box (g): '.$value->plaintext;
                }
                if($label->plaintext=='Qtà imb multiplo (pcs)'){
                     $filtro['qta_imb_multipplo']= 'Qtà imb multiplo (pcs): '.$value->plaintext;
                }
                if($label->plaintext=='Peso imb multiplo (kg)'){
                     $filtro['peso_imb_multipplo']= 'Peso imb multiplo (kg): '.$value->plaintext;
                }
                if($label->plaintext=='Tipo imb multiplo '){
                     $filtro['tipo_imb_multipplo']= 'Tipo imb multiplo: '.$value->plaintext;
                }
            }
       }
}
$filtro['imagine']='http://www.tecneco.com'.$dom->find('#immagine_0',0)->find('img',0)->src;
$filtro['imagine_size']='http://www.tecneco.com'.$dom->find('#immagine_1',0)->find('img',0)->src;
//$filtro['imagine']=$dom->find('immagine_0',0)->find('img',0)->src;






$grupo_modelo_key;
$row=0;
 foreach ($dom->find('#cont_applicabilita') as $li){
            
             foreach ($li->find('#modello_select_auto') as $vol){
                    //echo $vol->plaintext;
                    $marca=$vol->find('#opt_marca',0)->plaintext;
                    foreach ($vol->find('option') as $model){
                        if($model->value!='0'){
                        $grupo_modelo_key[$row]['id'] = $model->value;
                        $grupo_modelo_key[$row]['marca']=$marca;

                        $grupo_modelo_key[$row]['modelo']=$li->find('#gruppo_'.$model->value,0)->find('h2', 0)->plaintext;
                        $d=0;
                        $modelos=[];
                        foreach ($li->find('#gruppo_'.$model->value,0)->find('option') as $sub_model){
                            if($sub_model->value!='0'){
                                $modelos[$d]=$sub_model->plaintext;
                            
                            $d=$d+1;
                            //echo $sub_model->plaintext;
                            }
                        }
                        $grupo_modelo_key[$row]['version']=$modelos;
                        $row=$row+1;
                        }
                       
                    }
             }
 }


$component=[];
$component['filtro']=$filtro;
$component['produttore']=$grupo_modelo_key;
return $this->crearRespuestaConData('Nuevo Ubigeo stato registrato.',$component,200);


        
    }

    public function setScrapeUrl($url =NULL, $method='GET'){
        $this->crawler= $this->client->request($method, $url);
        
        return $this->crawler;
    }

    public function getContents(){
        return $this->content= $this->startScraper();
    }


    public function startScraper(){
        $countContent=$this->crawler->filter('.text-filtro')->count();
        echo $countContent;
        if($countContent){
            $this->content= $this->crawler->filter('#codice_articolo_filtro2')->text();
             
/*
            $this->content= $this->crawler->filter('#codice_articolo_filtro2')->each(function(Crawler $node,$i){
                return $node->text();
            //return [
                //'title'        => $node->text()
                //'title'     =>$node->filter($this->filters['title'])->text()
                //'url'       =>$this->url.$node->filter($this->filters['title'])->attr('href'),
                //'author'     =>$node->filter($this->filters['author'])->text(),
            //];

            });*/

           
        }
        //return $this->content;
    }

}
