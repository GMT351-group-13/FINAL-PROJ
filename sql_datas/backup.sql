PGDMP     6    #                 |            postgres    14.10    14.10                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    13754    postgres    DATABASE     f   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Turkish_T�rkiye.1254';
    DROP DATABASE postgres;
                postgres    false                       0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    3335                        3079    16384 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                   false            	           0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
                        false    2            �            1259    16625    cafes    TABLE     �   CREATE TABLE public.cafes (
    id integer NOT NULL,
    cafe_name text,
    cafe_lat text,
    cafe_lon text,
    cafe_desc text
);
    DROP TABLE public.cafes;
       public         heap    postgres    false            �            1259    16632 
   permission    TABLE     �   CREATE TABLE public.permission (
    id integer NOT NULL,
    cafe_add integer,
    cafe_delete integer,
    cafe_list integer,
    cafe_create integer
);
    DROP TABLE public.permission;
       public         heap    postgres    false            �            1259    16637    role    TABLE     `   CREATE TABLE public.role (
    id integer NOT NULL,
    perm_id integer,
    user_id integer
);
    DROP TABLE public.role;
       public         heap    postgres    false            �            1259    16618    users    TABLE     �   CREATE TABLE public.users (
    id bigint NOT NULL,
    firstname text,
    lastname text,
    email text,
    password text,
    isadmin integer DEFAULT 0
);
    DROP TABLE public.users;
       public         heap    postgres    false            �          0    16625    cafes 
   TABLE DATA           M   COPY public.cafes (id, cafe_name, cafe_lat, cafe_lon, cafe_desc) FROM stdin;
    public          postgres    false    211   �                  0    16632 
   permission 
   TABLE DATA           W   COPY public.permission (id, cafe_add, cafe_delete, cafe_list, cafe_create) FROM stdin;
    public          postgres    false    212   a                 0    16637    role 
   TABLE DATA           4   COPY public.role (id, perm_id, user_id) FROM stdin;
    public          postgres    false    213   ~       �          0    16618    users 
   TABLE DATA           R   COPY public.users (id, firstname, lastname, email, password, isadmin) FROM stdin;
    public          postgres    false    210   �       n           2606    16636    permission Permission_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.permission
    ADD CONSTRAINT "Permission_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.permission DROP CONSTRAINT "Permission_pkey";
       public            postgres    false    212            p           2606    16641    role Role_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.role
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.role DROP CONSTRAINT "Role_pkey";
       public            postgres    false    213            l           2606    16631    cafes cafe_pkey 
   CONSTRAINT     M   ALTER TABLE ONLY public.cafes
    ADD CONSTRAINT cafe_pkey PRIMARY KEY (id);
 9   ALTER TABLE ONLY public.cafes DROP CONSTRAINT cafe_pkey;
       public            postgres    false    211            j           2606    16653    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    210            q           2606    16642    role for_per    FK CONSTRAINT     p   ALTER TABLE ONLY public.role
    ADD CONSTRAINT for_per FOREIGN KEY (perm_id) REFERENCES public.permission(id);
 6   ALTER TABLE ONLY public.role DROP CONSTRAINT for_per;
       public          postgres    false    213    212    3182            r           2606    16654    role for_user    FK CONSTRAINT     v   ALTER TABLE ONLY public.role
    ADD CONSTRAINT for_user FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;
 7   ALTER TABLE ONLY public.role DROP CONSTRAINT for_user;
       public          postgres    false    210    3178    213            �   �  x��V�n#7=����� �@6��� cĘd�I�BI�E�&Pl��䪣Ϻ�ɷ��+�^dil�lH�Įz���+�,�2s�]Y�k�u�.͍E	�S%�"�J�5g:��TR"Tʤ&�h!�w��y��,���}e&7%j?�ޖs�[�J���%�<n�uh�|{_e�}��C�>����]���<<;����ڬL�ߡ�
���!�~:Iu�Sm���eusc���M	��F�(���f��~�	1n{o�.D�C�)����Kt�8A5�y*-�u�#|���E�GL��\4��,LL�g:�$��̗UR�b"%D��$LS ������i���m\{�Vna������ZT��B�͎�����~�����Ů$�1��FHr����MϠ�@V�I��ÖbN�Z*�Y���� ��	�2a�{�/b��4�+�Թt����?4��v��$U��~{��ʸ3Ewza��C?n��9�xg��O���,;�P� U�p�٠x���xJ�����^���:^�Y!2�e��2W�0�f�P5V�4O	�Z�aV^��q*7'H�~eO:|�$56I�οY��N�D�$&L	��A�D��EqAXrq�l��3>�qd���M Wc����A �����/����YU @��!$��2p�Oe|�W[�o����'jD�6yUNч�4kP���3�\Tg���m�0k���ɝ�@,�*�:�E��"4I�媍�� �ftq��N%�����T�� �t�uAv�#�.0�X��� ܫn�'8Ie����ӌNʹ��܆�B��N���P��{�o��&�����t5Z�ۘ��1=g�	3p�1}*��R <�:�ٗ���@��nCͼ5����!���)mEb)`�`�E{(HI,,��6��̟�ch?۬��EZK����qE(�AL�
��pV�6��0!a;:�9��T��E�C`Gn\��;(��,�1�T��~D5�RS.9Xf��ׄ�_sX��_Ǜ� �Y��H$��z���N)�(F�
D
�`ci��s#o���<^��~�A��Yg�|� 4�Fڛ�p�2���P��La�-���a4�,J��0�6��������u<��3n�႘��X�a�鳿��O��d���U             x������ � �            x������ � �      �   �  x�e��v�0�u|� dW-ZZ����D��� ���2���n:�5��9n�s��w�GL��ij���y�ĕ�Z\䠏v}���e}����ϳ���0a�(2">��St�/��I=�z��J�޳ �Z���?UIZ7\��UR7���T����50�d�����H�o��xoYP�y�V�F��ɂ�پ,Q{b�A �l�B:���i����2����Ů�i�h�&E��N�W>���Y5�����/��%��z���:h�rTeaga�&�6��\��{�l��T���^�lҮ@�Q$�V���|��2q����ɺ�R<f�U�vƆ�)-7�\��iR[�*Qv#�HpkU���E>Z��Y䍕1E1��[lvX[ؒ�V���	.sӘ���n�Ht�/����i,�     